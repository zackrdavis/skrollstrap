(function(window, document, $, _, skrollr){
'use strict';

    function Skrollstrap(){
        // CONTAINERS
        // ============================================================
        this.keyframes         = null;
        this.defaultKeyframes  = {};
        this.combinedKeyframes = {};
        this.skrollrConstants  = {};
        this.constantValues    = {};
        this.s                 = null;
        this.skrollData        = {};

        // STATE
        // ============================================================
        this.scrollY = true;

        // ELEMENTS
        // ============================================================
        this.$window            = $(window);
        this.$header            = $('header');
        this.$bgContainerSticky = $(".background-container-sticky");
        this.$bgFixed           = $(".background-fixed");
        this.$header            = $('header');
        this.$skrollrBody       = $('#skrollr-body');
        this.$sections          = $('section');

        // SIZES
        // ============================================================
        this.contentLength  = null;
        this.windowHeight   = null;
        this.headerHeight   = null;
        this.viewportHeight = null;

        this.init = function(keyframes, constants, scroll){
            this.keyframes      = keyframes;
            this.constantValues = constants;
            this.scrollY        = scroll === 'fixed' ? false : true;

            _.bindAll(this,
                'onWindowScroll'
            );

            this.calculateSizes();

            this.loadKeyframes(this.combinedKeyframes);
            // Events
            this.$window.on('scroll', this.onWindowScroll);
        };

        // to use this, go to the console and type
        // app.skrollstrap.goTo(skrollValue)
        // skrollValue being the place you want to jump to
        this.goTo = function(number){
            this.s.animateTo(number);
        };

        this.startSkrollr = function(){
            var self       = this,
                $scrollHud = $(".scroll-hud-b");
            this.loadKeyframes(this.combinedKeyframes);
            this.s = skrollr.init({
                render : function(data) {
                    self.skrollData = data;
                    $scrollHud.html(
                        'skroll: ' + data.curTop + '<br>' + self.keyFrameInfo
                    );
                },
                mobileDeceleration : 0.008,
                constants          : self.skrollrConstants,
                forceHeight        : true,
                edgeStrategy       : 'set',
                keyframe           : function(element, name, direction) {
                    self.keyFrameInfo = name + " " + direction;
                }
            });
            this.removeMobileAttributes();
// console.log(this.skrollrConstants);
        };

        this.resizeSkrollr = function() {
            this.calculateSizes();
            this.loadKeyframes(this.combinedKeyframes);

            if(this.s !== null) {
                this.removeMobileAttributes();
                this.s.refresh();
            }
        };

        this.onWindowScroll = function() {
            if (this.s.isMobile()) {
                if ( this.$window.scrollTop() !== 0 ) {
                    this.$window.scrollTop(0);
                }
            }
        };

        this.calculateSizes = function(){
            this.resizeProps();
            this.sizeDefaults();
            this.addDefaults();

            // if (this.scrollY){
            //     this.setupSections();
            //     // this.setupBgSticky();
            //     // this.setupBgFixed();
            // }

            this.addDefaultKeyframes();
            this.combineKeyframeObjs();
        };

        this.resizeProps = function(){
            this.headerHeight   = this.$header.height();
            this.windowHeight   = this.$window.height();
            this.viewportHeight = this.windowHeight - this.headerHeight;
            this.contentLength  = this.$skrollrBody.outerHeight();

// console.log(this.headerHeight, this.windowHeight, this.viewportHeight, this.contentLength );
        };

        // skroller can't use uppercaseLetters in constant names
        // so snake_case must be used.
        this.addDefaults = function(){
            this.constantValues.header_height           = this.headerHeight;
            this.constantValues.viewport_height         = this.viewportHeight;
            this.constantValues.viewport_neg            = -this.viewportHeight;
            this.constantValues.viewport_half           = this.viewportHeight * 0.5;
            this.constantValues.viewport_quarter        = this.viewportHeight * 0.25;
            this.constantValues.viewport_third          = this.viewportHeight * 0.33;
            this.constantValues.content_length          = this.contentLength;
            this.constantValues.content_skroll_end      = this.contentLength - this.viewportHeight;
            this.constantValues.content_skroll_distance = -(this.constantValues.content_skroll_end);
// console.log(this.constantValues);
        };

        this.sizeDefaults = function(){
            this.$bgContainerSticky.css('height', this.windowHeight );
            this.$bgFixed.css('height', this.windowHeight);
        };

        this.removeMobileAttributes = function(s) {
            if (this.s.isMobile()) {
                console.log('mobile!');
                this.$skrollrBody.removeAttr("data-_start0");
                this.$skrollrBody.removeAttr("data-_content_skroll_end");
                this.$skrollrBody.removeAttr("skrollable");
                this.$skrollrBody.removeAttr("skrollable-between");
            }
        };

        this.addDefaultKeyframes = function() {
            if (this.scrollY){
                this.defaultKeyframes['#skrollr-body'] = {
                    "_start0"             : "top:0px",
                    "_content_skroll_end" : "top:+content_skroll_distance+px"
                    // "start0"         : "transform:translateY(0px)",
                    // "content_length" : "transform:translateY(+content_skroll_distance+px)"
                };
            }
        };

        // Combine the keyframes and the defaults
        this.combineKeyframeObjs = function(){
            $.extend(true,
                this.combinedKeyframes,
                this.defaultKeyframes,
                this.keyframes);
        };

        // This function parses the keyframes, adds them to skrollrConstants,
        // and adds the data attributes to the DOM.
        this.loadKeyframes = function(data) {
            var el, item, selector, constant, nakedConstant, cssDeclaration, cssArray, cssProp, cssValue, constantValue, reg, cssValueSplit, cssVariable;
// console.log(data);
            // For each selector in the data
            for (selector in data) {
                // cache the item
                item = data[selector];
                // find the corresponding element in the DOM
                el   = document.querySelectorAll(selector);
// console.log(el);

                // for each constant attached to the selector we save
                // the entire css attribute
                // split the attribute into an array so we can check if
                // it is a value or a variable from the constantValue obj.
                // and cache the constant value
                for (constant in item) {
                    // the regEx is to search the cssValue for variables which will now
                    // be placed between '+' characters. For example
                    // "transform:translateY(+section4Height+px)"
                    reg            = /[+]/;
                    cssDeclaration = item[constant];
                    // remove underscore from constant before checking in constantValues
                    if(constant.charAt(0) === '_'){
                        nakedConstant = constant.substr(1);
                    }
                    constantValue  = this.constantValues[nakedConstant];
                    // Test if the css value has a '+' meaning there is a
                    // variable contained inside
                    if (reg.test(cssDeclaration)) {
                        // Split the variable at the plus
                        cssValueSplit = cssDeclaration.split('+');
                        // Take the second item in the array which will be the variable
                        // if a property starts with the variable such as "top:+content_skroll_distance+px"
                        // the first item in the array will be ''. and empty string.
//console.log(cssValueSplit[0] + ' ' + cssValueSplit[1] + ' ' + cssValueSplit[2]);
                        cssVariable   = cssValueSplit[1];
                        // Make sure it's in the constants array
                        if (cssVariable in this.constantValues) {
                            // Replace the variable with the value
                            cssValueSplit[1] = this.constantValues[cssVariable];
                            // Rejoin the css value without the '+'
                            cssValue = cssValueSplit.join('');
                            // Reset the declaration
                            cssDeclaration = cssValueSplit[0] + cssValueSplit[1] + cssValueSplit[2];
                        }
                    }

                    // if, in your keyframes you are using properties like
                    //       "_diagram1_start"    : "opacity[swing]:0",
                    //       "_diagram1_start-50" : "opacity:1"
                    // "diagram1_start-50" is using the constant "diagram1_start"
                    // and is undefined. These should not be added to the
                    // skrollrConstants obj that get passed to skroller.
                    if (constantValue !== undefined) {
                    // save the constant to the skrollr constants obj
                        this.skrollrConstants[nakedConstant] = constantValue;
                    }
// console.log(constant, cssDeclaration);
                    // set the new data attribute on the element
                    // if(el.length === 1) {
                    //     el.setAttribute('data-' + constant, cssDeclaration);
                    //     el.setAttribute('data-emit-events', '');
                    // } else if (el.length > 1) {
                    _.forEach(el, function(item){
// console.log(item);
// console.log('data-' + constant);
                        item.setAttribute('data-' + constant, cssDeclaration);
                        item.setAttribute('data-emit-events', '');
                    });
                    // }
                }
            }
    // console.log(this.skrollrConstants);
        };
    }

    window.Skrollstrap = Skrollstrap;
})(window, document, jQuery, _, skrollr);


// Data Structure
// var dataStructure = {
//     // "selector" : {
//     //     "constant1" : "cssProp",
//     //     "constant2" : "cssprop"
//     // }
//       ".titles" : {
//          "titles_start": "opacity:1",
//          "titles_end"  : "opacity:0"
//       }
// };
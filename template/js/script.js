(function(scope, $, _){

    var app = scope.app = {
        // CONTAINERS
        // ==========================================================
        constants : {},
        // add the keyframes from another file.
        keyframes : keyframes || {},

        // STATE
        // ==========================================================
        bottomReached : false,
        isSmall       : false,

        // REFERENCES
        // ==========================================================
        $window          : $(window),
        $body            : $('body'),
        $header          : $('header'),
        $backgroundFull  : $('.background-full'),
        $backgroundFixed : $('.background-fixed'),
        $force3x2        : $('.force3x2'),
        $sections        : $('section'),
        $section0        : $('.section0'),
        $section1        : $('.section1'),
        $section2        : $('.section2'),
        $heritage        : $('#heritage'),
        $dualLaunch      : $('#dual-launch'),
        $section3        : $('.section3'),
        $section4        : $('.section4'),
        $animationTitle  : $('#animation-title'),
        $animationImages : $('#animation-images'),
        $section5        : $('.section5'),
        $digitalTapestry : $('#digital-tapestry'),
        $section6        : $('.section6'),
        $credits         : $('.credits'),
        headerHeight     : null,
        windowHeight     : null,
        windowWidth      : null,
        viewportHeight   : null,
        skrollstrap      : null,

        init : function(){
            // Add all functions that are triggered by events in here.
            _.bindAll(this,
                'onWindowResize',
                'onWindowScroll'
            );

            // determine if touch events are needed
            this.buttonClickEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
            this.pageScrollEvent  = 'ontouchstart' in window ? 'touchmove'  : 'scroll';

            // Events
            this.$window.on('resize', this.onWindowResize)
                        .on('scroll', this.onWindowScroll);
            // this.$body.on(this.buttonClickEvent, '.selector', this.function);

            // set up all keyframes and constants for the project
            this.setSizesandConstants();

            // Create a new Skrollstrap instance
            this.skrollstrap = new Skrollstrap();
            // initialize Skrollstrap with the custon keyframes and constants
            this.skrollstrap.init(this.keyframes, this.constants);

            // Add the constants from Skrollstrap so they can be used in calcValues
            $.extend(true, this.constants, this.skrollstrap.constantValues);

            // Start Skrollr
            this.skrollstrap.startSkrollr();
            this.refreshAll();
        },

        onWindowScroll: function(){
            // This is for custom scroll events. Make sure to add the correct tracking
            // number and description
            // console.log(this.skrollstrap.skrollData.curTop + "    " + this.skrollstrap.skrollData.maxTop);
            if (this.skrollstrap.skrollData.curTop > this.skrollstrap.skrollData.maxTop - 100 && this.skrollstrap.skrollData.direction === 'down' && !this.bottomReached) {
                
                this.bottomReached = true;
                console.log('bottom reached');
                _gaq.push(['_trackEvent', 'Lockheed Information-Age cascade', 'Scrollto', 'Final Section Reached']);
            }
        },

        // renderScrollEvent: function() {
        //     console.log(this.skrollstrap.skrollData.curTop + "    " + this.skrollstrap.skrollData.maxTop);
        //     if (this.skrollstrap.skrollData.curTop > this.skrollstrap.skrollData.maxTop - 10 && this.skrollstrap.skrollData.direction === 'down' && !this.bottomReached) {
                
        //         this.bottomReached = true;
        //         console.log('bottom reached');
        //         _gaq.push(['_trackEvent', 'Lockheed Information-Age cascade', 'Scrollto', 'Final Section Reached']);
        //     }
        // },

        onWindowResize: function() {
            this.refreshAll();
        },

        setSizesandConstants: function() {
            this.refreshSizes();
            this.calcValues();
        },

        refreshAll: function(){
            this.refreshSizes();
            this.setupSections();
            this.calcValues();
            this.skrollstrap.resizeSkrollr();
        },

        refreshSizes: function() {
            var force3x2Width;
            this.headerHeight            = this.$header.height();
            this.windowHeight            = this.$window.height();
            this.windowWidth             = this.$window.width();
            this.viewportHeight          = this.windowHeight - this.headerHeight;
            
            force3x2Width                = this.windowHeight * 3 / 2;

            this.animationHeight         = this.viewportHeight - this.$animationTitle.outerHeight() - 20;
            force4x3Width                = this.animationHeight * 4 / 3;

            

            // isSmall is a check if you are in bootstraps mobile view.
            // Sometimes animations will have to be changed particularly
            // if they are in a sidebar.
            this.isSmall = this.windowWidth < 767 ? true : false;
// console.log(this.viewportHeight, this.windowWidth);
            this.$backgroundFixed.css('height', this.viewportHeight );
            this.$section6.css('height', this.viewportHeight );
            this.$backgroundFull.css({
                'height': this.viewportHeight + 'px',
                'width' : this.windowWidth + 'px'
            });

            if (this.windowWidth < force3x2Width) {
                this.$force3x2.css({
                    'height': this.windowHeight + 'px',
                    'width' : (this.windowHeight * 3 / 2) + 'px'
                });
            } else {
                this.$force3x2.css({
                    'height': (this.windowWidth * 2 / 3) + 'px',
                    'width' : this.windowWidth + 'px'
                });
            }

            if (this.windowWidth < force4x3Width) {
                this.$animationImages.css({
                    'height': (this.windowWidth * 3 / 4) + 'px',
                    'width' : this.windowWidth + 'px'
                });
            } else {
                this.$animationImages.css({
                    'height': this.animationHeight + 'px',
                    'width' : (this.animationHeight * 4 / 3) + 'px'
                });
            }

            this.$digitalTapestry.css({
                'top': ((this.viewportHeight - this.$digitalTapestry.height()) / 2) 
            })

            if ( this.$section6.height() > this.$credits.height() ) {
                this.$section6.css('height', this.viewportHeight);
                this.$credits.css('margin-top', this.$section6.height() - this.$credits.height());
            }

            // Add all custom sizing here

        },

        // This creates some helpful defaults but they're unnecessary
        // in a fixed position project
        setupSections : function() {
            var self = this;

            this.$sections.each(function(index){
                var $this       = $(this),
                    height      = $this.outerHeight(true),
                    positionTop = $this.position().top,
                    sectionName = "section" + index;
// console.log(sectionName, positionTop, height);
                self.constants[sectionName + "_topbottom"]    = positionTop - self.viewportHeight;
                self.constants[sectionName + "_toptop"]       = positionTop;
                self.constants[sectionName + "_height"]       = height;
                // scroll distance to keep background fixed
                self.constants[sectionName + "_stickydist"]   = height - self.viewportHeight;
                // scroll distance to keep background fixed
                self.constants[sectionName + "_fixeddist"]    = height - self.viewportHeight;
                self.constants[sectionName + "_bottombottom"] = positionTop + height - self.viewportHeight;
            });
        },

        calcValues: function() {
            // Add your constants here. Remember that skrollr doesn't use capital letters

            // section0
            this.constants.section0_start    = 0;

            // section1
            this.constants.section1_start = this.constants.section1_toptop;

            // section2
            this.constants.section2_start = this.constants.section2_toptop;

            this.constants.section2_content_start = this.constants.section2_toptop + 1600 - this.viewportHeight;
            
            this.constants.heritage_height = this.$heritage.height();
            this.constants.heritage_done  = this.constants.section2_content_start + this.constants.heritage_height;

            this.constants.dual_launch_height = this.$dualLaunch.outerHeight();
            this.constants.dual_launch_done  = this.constants.heritage_done + this.constants.dual_launch_height;



            // section3
            this.constants.section3_start = this.constants.section3_toptop;

            // section4
            this.constants.section4_start = this.constants.section4_toptop;

            this.animationPart = (this.constants.section4_bottombottom - this.constants.section4_toptop) / 7;
            this.constants.sec4part1 = this.constants.section4_toptop + this.animationPart;
            this.constants.sec4part2 = this.constants.sec4part1 + this.animationPart;
            this.constants.sec4part3 = this.constants.sec4part2 + this.animationPart;
            this.constants.sec4part4 = this.constants.sec4part3 + this.animationPart;
            this.constants.sec4part5 = this.constants.sec4part4 + this.animationPart;
            this.constants.sec4part6 = this.constants.sec4part5 + this.animationPart;
            this.constants.sec4part7 = this.constants.sec4part6 + this.animationPart;

            // section5
            this.constants.section5_start = this.constants.section5_toptop;
            this.constants.sec5half = this.constants.section5_start + (this.constants.section5_fixeddist / 2);

            // section6...

    // console.log(this.constants);
        },
    };
})(window.__scope__ || window, jQuery, _);
var app = app || {};

var keyframes = {
//register all your keyframes.
//     // "selector" : {
//     //     "constant1" : "cssProp",
//     //     "constant2" : "cssprop"
//     // }

// '.flipper': {
//     '100-bottom' : 'transform[swing]: perspective(1000px) rotate3d(1,0,0,-90deg)',
//     'center'     : 'transform[swing]: perspective(1000px) rotate3d(1,0,0,0deg)',
//     '-100-top'   : 'transform[swing]: perspective(1000px) rotate3d(1,0,0,90deg)'
// },

    "#scroll-arrow-down" : {
        "_section0_start-25" : "opacity:1",
        "_section0_start-75" : "opacity:0"
    },

// section0
    "#intro-animation" : {
        "_section0_start"        : "transform:translateY(0px);background-position: 0% 50%",
        "_section0_bottombottom" : "transform:translateY(+section0_bottombottom+px);background-position: 10% 50%"
    },

    ".section0 .satellite" : {
        "_section0_start"        : "left:100%;width:10%;height:20%",
        "_section0_bottombottom" : "left:10%;width:40%;height:100%"
    },

    ".section0 .satellite img" : {
        "_section0_start"        : "bottom:70%;transform:rotate(30deg)",
        "_section0_bottombottom" : "bottom: 10%;transform:rotate(0deg)"
    },

    ".section0 .globe" : {
        "_section0_start"        : "top: 40px;  right:100px; width:300px; transform:translateY(0px)",
        "_section0_bottombottom" : "top: 100px; right:120px; width:300px; transform:translateY(0px)",
        "_section1_bottombottom" : "top: 100px; right:181px; width:200px; transform:translateY(+section0_bottombottom+px)"
    },

    ".section0 .globe img" : {
        "_section0_bottombottom" : "opacity:1",
        "_section0_bottombottom-300" : "opacity:0"
    },

    "#all-bg .intro-bg" : {
        "_section0_start"        : "opacity:1; background-position: 0% 50%",
        "_section1_toptop"       : "opacity:1; background-position: 10% 50%",
        "_section2_toptop"       : "opacity:1; background-position: 10% 50%",
        "_section2_toptop-1"     : "opacity:0; background-position: 10% 50%"
    },

//section1

    "#all-bg .eye-bg" : {
        "_section1_topbottom"    : "opacity:0",
        "_section1_toptop"       : "opacity:1",
        "_section2_toptop"       : "opacity:1",
        "_section2_toptop-1"     : "opacity:0"
    },

    ".section1 .background-full" : {
        "_section1_toptop"       : "transform:translateY(0px);",
        "_section1_bottombottom" : "transform:translateY(+section1_stickydist+px);"
    },

    ".section1 .data" : {
        "_section1_toptop"       : "opacity:0; ",
        "_section1_toptop-100"   : "opacity:1; "
    },

    ".section1 .data .reticle"  : {
        "_section1_toptop--300"    : "transform:rotate(0deg)",
        "_section2_toptop"         : "transform:rotate(600deg)"
    },
    ".section1 .data .tag2"  : {
        "_section1_toptop-50"      : "opacity:0",
        "_section1_toptop-75"      : "opacity:1"
    },
    ".section1 .data .tag1"  : {
        "_section1_toptop-200"     : "opacity:0",
        "_section1_toptop-225"     : "opacity:1"
    },

//section2
    
    ".section2 .background-full"   : {

        "_section1_bottombottom"   : "transform:translateY(0px);                     background-position: 0%   100%",
        "_section2_toptop"         : "transform:translateY(0px);                     background-position: 10%   0%",
        "_section2_bottombottom"   : "transform:translateY(+section2_stickydist+px); background-position: -10% 0%",
        "_section3_toptop"   : "transform:translateY(+section2_stickydist+px); background-position: -10% -100%"
    },

    ".sat1" : {
        "_section2_toptop"         : "left: 100%  ;margin-top:300px; opacity:1",
        "_section2_toptop-350"     : "left: 0%    ;margin-top:150px; opacity:1",
        "_section2_toptop-700"     : "left: 0%    ;margin-top:150px; opacity:1",
        "_section2_toptop-800"     : "left: 0%    ;margin-top:150px; opacity:0"
    },
        ".sat1 div" : {
            "_section2_toptop-350" : "opacity: 0",
            "_section2_toptop-400" : "opacity:1"
        },
    ".sat2" : {
        "_section2_toptop-100"     : "left: 100% ;margin-top:300px; opacity:1",
        "_section2_toptop-450"     : "left: 25%   ;margin-top:  0px; opacity:1",
        "_section2_toptop-700"     : "left: 25%   ;margin-top:  0px; opacity:1",
        "_section2_toptop-800"     : "left: 25%   ;margin-top:  0px; opacity:0"

    },
        ".sat2 div" : {
            "_section2_toptop-450" : "opacity: 0",
            "_section2_toptop-500" : "opacity:1"
        },
     ".sat3" : {
        "_section2_toptop-200"     : "left: 100%  ;margin-top:300px; opacity:1",
        "_section2_toptop-550"     : "left: 50%   ;margin-top:  0px; opacity:1",
        "_section2_toptop-700"     : "left: 50%   ;margin-top:  0px; opacity:1",
        "_section2_toptop-800"     : "left: 50%   ;margin-top:  0px; opacity:0"
    },
        ".sat3 div" : {
            "_section2_toptop-550" : "opacity: 0",
            "_section2_toptop-600" : "opacity:1"
        },
     ".sat4" : {
        "_section2_toptop-300"     : "left: 100%  ;margin-top:300px; opacity:1",
        "_section2_toptop-650"     : "left: 75%   ;margin-top:150px; opacity:1",
        "_section2_toptop-700"     : "left: 75%   ;margin-top:150px; opacity:1",
        "_section2_toptop-800"     : "left: 75%   ;margin-top:150px; opacity:0"
        },
        ".sat4 div" : {
            "_section2_toptop-650" : "opacity: 0",
            "_section2_toptop-700" : "opacity:1"
        },

    ".big-globe" : {
        "_section2_toptop-750"     : "top: 50%;",
        "_section2_toptop-1200"    : "top:-60%;"
    },

    ".sidebar-sat1-container" : {
        "bottom-bottom"            : "opacity:0",
        "-150-bottom-bottom"       : "opacity:1"
    },
        // ".sidebar-sat1" : {
        // "_section2_toptop-1100"    : "opacity:0",
        // "_section2_toptop-1200"    : "opacity:1",
        // "_heritage_done-300"       : "opacity:1",
        // "_heritage_done-350"       : "opacity:0"
        // },

    ".sidebar-sat2-container" : {
        "bottom-bottom"            : "opacity:0",
        "-150-bottom-bottom"       : "opacity:1"
    },
        // ".sidebar-sat2" : {
        //     "_heritage_done-200"    : "opacity:0",
        //     "_heritage_done-250"    : "opacity:1",
        //     "_dual_launch_done-300"       : "opacity:1",
        //     "_dual_launch_done-350"       : "opacity:0"
        // },

//section3

    ".section3 .background-full"   : {
        "_section3_toptop"         : "transform:translateY(0px);",
        "_section3_bottombottom"   : "transform:translateY(+section3_stickydist+px);"
    },

//section4

    ".section4 .animation-container" : {
        "_section4_start"          : "transform:translateY(0px)",
        "_section4_bottombottom"   : "transform:translateY(+section4_stickydist+px)"
    },

    "#bar1" : {
        "_section4_start"          : "transform:scaleX(0)",
        "_sec4part1"               : "transform:scaleX(1)"
    },

    "#bar2" : {
        "_sec4part1"               : "transform:scaleX(0)",
        "_sec4part2"               : "transform:scaleX(1)"
    },

    "#bar3" : {        
        "_sec4part2"               : "transform:scaleX(0)",
        "_sec4part3"               : "transform:scaleX(1)"
    },

    "#box1" : {
        "_sec4part3"               : "opacity:0",
        "_sec4part4"               : "opacity:1"
    },
    "#box2" : {
        "_sec4part4"               : "opacity:0",
        "_sec4part5"               : "opacity:1"
    },
    "#box3" : {
        "_sec4part5"               : "opacity:0",
        "_sec4part6"               : "opacity:1"
    },
    "#box4" : {
        "_sec4part6"               : "opacity:0",
        "_sec4part7"               : "opacity:1"
    },  

//section5

    "#digital-tapestry"  : {
        "_section5_toptop"         : "transform:translateY(0px);",
        "_section5_bottombottom"   : "transform:translateY(+section5_stickydist+px);"
    },

    "#tapestry-image" : {
        "_section5_toptop--50"           : "opacity:0",
        "_section5_toptop"               : "opacity:1",
        "_section5_bottombottom"         : "opacity:1",
        "_section5_bottombottom-50"      : "opacity:0"
    },

    "#dt1" : {
        "_section5_toptop-50"        : "opacity:1",
        "_section5_bottombottom--50" : "opacity:1"
    },

    "#dt2" : {
        "_section5_toptop-50"        : "opacity:0",
        "_section5_bottombottom--50" : "opacity:1"
    },

//credits

    "#all-bg .credits-bg" : {
        "_section0_start"              : "opacity:0",
        "_section5_bottombottom"             : "opacity:0",
        "_section6_bottombottom"       : "opacity:1"
    }

    // ".section6 .background-fixed"  : {
    //     "_section6_topbottom"      : "transform:translateY(-100%);",
    //     "_section6_toptop"         : "transform:translateY(0%);",
    // }


};
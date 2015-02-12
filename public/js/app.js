'use strict';

var s=skrollr.init({
    forceHeight:false
});

skrollr.menu.init(s,{
    animate:true,
    easing:'sqrt',
    scale:2,
    duration:function(currentTop,targetTop){
        return Math.abs(currentTop-targetTop)*5;
    }
});


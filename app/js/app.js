// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

var s=skrollr.init({forceHeight: true});

skrollr.menu.init(s,{
    animate:true,
    easing:'sqrt',
    scale:2,
    duration:function(currentTop,targetTop){
        return Math.abs(currentTop-targetTop)*5;
    }
});


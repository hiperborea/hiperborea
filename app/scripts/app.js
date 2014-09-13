var App=window.App=Ember.Application.create();

App.Store=DS.Store.extend();
App.Skrollr=skrollr.init({forceHeight:false});

/*skrollr.menu.init(s,{
    animate:true,
    easing:'sqrt',
    scale:2,
    duration:function(currentTop,targetTop){
        return Math.abs(currentTop-targetTop)*5;
    }
});*/

App.Router.map(function(){
    this.route('index',{path:'/'});
    this.route('security');
    this.route('development');
    this.route('sysadmin');
});

App.SkrollrView=Em.View.extend({
    didInsertElement:function(){
        App.Skrollr.refresh();
    }
});

App.SecurityView=App.SkrollrView.extend();
App.DevelopmentView=App.SkrollrView.extend();
App.SysadminView=App.SkrollrView.extend();


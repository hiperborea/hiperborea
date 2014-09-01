var App=window.App=Ember.Application.create();

App.Store=DS.Store.extend();

App.Router.map(function(){
    this.resource('index',{path:'/'});
});

/*App.IndexRoute = Ember.Route.extend({
model: function() {
return ['red', 'yellow', 'blue'];
}
});*/

/* Order and include as you please. */
/*require('scripts/controllers/*');
//require('scripts/store');
//require('scripts/models/*');
//require('scripts/routes/*');
//require('scripts/components/*');
//require('scripts/views/*');
//require('scripts/router');
*/


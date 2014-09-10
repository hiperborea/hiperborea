var App=window.App=Ember.Application.create();
App.skrollr=skrollr.init({forceHeight:true});

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/components/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');


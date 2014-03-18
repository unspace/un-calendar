module.exports = function(broccoli) {
  var filterTemplates     = require('broccoli-template');
  var vndFilterES6Modules = require('broccoli-dist-es6-module');
  var compileSass         = require('broccoli-sass');
  var lib                 = broccoli.makeTree('lib');
  var scss                = broccoli.makeTree('scss');

  function filterES6Modules(tree, opts) {
    return new broccoli.MergedTree(vndFilterES6Modules(tree, opts));
  }

  scss = compileSass([scss], 'ui-calendar.scss', 'ui-calendar.css');

  lib = filterTemplates(lib, {
    extensions: ['hbs'],
    compileFunction: 'Ember.Handlebars.compile'
  });

  lib = filterES6Modules(lib, {
    global:      'Ember.UiCalendar',
    packageName: 'ember-ui-calendar',
    main:        'main',

    shim: {
      ember:      'Ember',
      handlebars: 'Handlebars',
      moment:     'moment'
    }
  });

  return [lib, scss];
};

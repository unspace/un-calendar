var pickFiles           = require('broccoli-static-compiler');
var filterTemplates     = require('broccoli-template');
var vndFilterES6Modules = require('broccoli-dist-es6-module');
var compileSass         = require('broccoli-sass');
var mergeTrees          = require('broccoli-merge-trees');
var autoprefixer        = require('broccoli-autoprefixer');

var lib                 = 'lib';
var scss                = 'scss';

function filterES6Modules(tree, opts) {
  return vndFilterES6Modules(tree, opts);
}

var styles = compileSass([scss], 'ui-calendar.scss', 'ui-calendar.css');
styles = autoprefixer(styles);

lib = filterTemplates(lib, {
  extensions: ['hbs'],
  compileFunction: 'Ember.Handlebars.compile'
});

lib = filterES6Modules(lib, {
  global:      'Un.Calendar',
  packageName: 'un-calendar',
  main:        'un-calendar',

  shim: {
    ember:      'Ember',
    handlebars: 'Handlebars',
    moment:     'moment'
  }
});

module.exports = mergeTrees([lib, styles]);

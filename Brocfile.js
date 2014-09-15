var pickFiles           = require('broccoli-static-compiler');
var vndFilterES6Modules = require('broccoli-dist-es6-module');
var compileSass         = require('broccoli-sass');
var mergeTrees          = require('broccoli-merge-trees');
var autoprefixer        = require('broccoli-autoprefixer');
var templateCompiler    = require('broccoli-ember-hbs-template-compiler');

var lib                 = 'lib';
var appAddonLib         = 'app-addon';
var templateAddonLib    = 'templates-addon';
var scss                = 'scss';

lib = mergeTrees([lib, appAddonLib]);

function filterES6Modules(tree, opts) {
  return vndFilterES6Modules(tree, opts);
}

var styles = compileSass([scss], 'un-calendar.scss', 'un-calendar.css');
styles = autoprefixer(styles);

var templates = pickFiles(templateAddonLib, {
  srcDir: '/components',
  destDir: '/templates'
});

templates = templateCompiler(templates, {
  module: true
});

lib = mergeTrees([lib, templates]);

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

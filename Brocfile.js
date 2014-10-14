var pickFiles           = require('broccoli-static-compiler');
var vndFilterES6Modules = require('broccoli-dist-es6-module');
var mergeTrees          = require('broccoli-merge-trees');
var autoprefixer        = require('broccoli-autoprefixer');
var templateCompiler    = require('broccoli-ember-hbs-template-compiler');

var lib                 = 'lib';
var appAddonLib         = 'app-addon';
var templateAddonLib    = 'templates-addon';
var styles = 'vendor-addon/un-calendar/styles';

lib = mergeTrees([lib, appAddonLib]);

function filterES6Modules(tree, opts) {
  return vndFilterES6Modules(tree, opts);
}


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

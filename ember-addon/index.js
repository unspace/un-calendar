'use strict';

var path = require('path');
var fs = require('fs');

function EmberCLIUnCalendar(project) {
  this.project = project;
  this.name = 'Ember UnCalendar';
}

function unwatchedTree(dir) {
  return {
    read: function() { return dir; },
    cleanup: function() { }
  };
}

EmberCLIUnCalendar.prototype.treeFor = function(name) {
  var treePath = path.join('node_modules', 'un-calendar',  name + '-addon');

  if ( fs.existsSync(treePath) ) {
    return unwatchedTree(treePath);
  }
};

EmberCLIUnCalendar.prototype.blueprintsPath = function(name) {
  return path.join(__dirname, 'blueprints');
};

EmberCLIUnCalendar.prototype.included = function(app) {
  this.app = app;

  this.app.import(app.bowerDirectory + '/moment/moment.js');
  this.app.import('vendor/un-calendar/moment-shim.js', {
    exports: {
      'moment': ['default']
    }
  });
};

module.exports = EmberCLIUnCalendar;

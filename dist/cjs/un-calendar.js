"use strict";
/*!
un-calendar
(c) 2014 Carsten Nielsen
License: https://github.com/unspace/un-calendar/blob/master/LICENSE
*/

var UnCalendarComponent = require("./un-calendar-component")["default"] || require("./un-calendar-component");
var UnCalendarMonthComponent = require("./un-calendar-month-component")["default"] || require("./un-calendar-month-component");
var UnCalendarTemplate = require("./templates/un-calendar")["default"] || require("./templates/un-calendar");
var Application = require("ember").Application;

Application.initializer({
  name: 'ember-un-calendar',

  initialize: function(container) {
    container.register('template:components/un-calendar', UnCalendarTemplate);
    container.register('component:un-calendar', UnCalendarComponent);
    container.register('component:un-calendar-month', UnCalendarMonthComponent);
  }
});

exports.UnCalendarComponent = UnCalendarComponent;
exports.UnCalendarMonthComponent = UnCalendarMonthComponent;
exports.UnCalendarTemplate = UnCalendarTemplate;
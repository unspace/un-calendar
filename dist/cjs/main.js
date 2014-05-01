"use strict";
/*!
ember-ui-calendar
(c) 2014 Carsten Nielsen
License: https://github.com/heycarsten/ember-ui-calendar/blob/master/LICENSE
*/

var UiCalendarComponent = require("./ui-calendar-component")["default"] || require("./ui-calendar-component");
var UiCalendarMonthComponent = require("./ui-calendar-month-component")["default"] || require("./ui-calendar-month-component");
var UiCalendarTemplate = require("./ui-calendar-template")["default"] || require("./ui-calendar-template");
var Application = require("ember").Application;

Application.initializer({
  name: 'ember-ui-calendar',

  initialize: function(container) {
    container.register('template:components/ui-calendar', UiCalendarTemplate);
    container.register('component:ui-calendar', UiCalendarComponent);
    container.register('component:ui-calendar-month', UiCalendarMonthComponent);
  }
});

exports.UiCalendarComponent = UiCalendarComponent;
exports.UiCalendarMonthComponent = UiCalendarMonthComponent;
exports.UiCalendarTemplate = UiCalendarTemplate;
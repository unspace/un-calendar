"use strict";
/*!
ember-ui-calendar
(c) 2014 Carsten Nielsen
License: https://github.com/heycarsten/ember-ui-calendar/blob/master/LICENSE
*/

var UiCalendarComponent = require("./ui-calendar-component").UiCalendarComponent;
var UiCalendarMonthComponent = require("./ui-calendar-month-component").UiCalendarMonthComponent;
var UiCalendarTemplate = require("./ui-calendar-template").UiCalendarTemplate;
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
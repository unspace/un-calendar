"use strict";
var UnCalendarComponent = require("../components/un-calendar")["default"] || require("../components/un-calendar");
var UnCalendarMonthComponent = require("../components/un-calendar-month")["default"] || require("../components/un-calendar-month");
var UnCalendarTemplate = require("../templates/un-calendar")["default"] || require("../templates/un-calendar");

exports["default"] = {
  name: 'un-calendar',

  initialize: function(container) {
    container.register('template:components/un-calendar', UnCalendarTemplate);
    container.register('component:un-calendar', UnCalendarComponent);
    container.register('component:un-calendar-month', UnCalendarMonthComponent);
  }
};
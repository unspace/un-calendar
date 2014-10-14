"use strict";
/*!
un-calendar
(c) 2014 Carsten Nielsen
License: https://github.com/unspace/un-calendar/blob/master/LICENSE
*/

var UnCalendarComponent = require("./components/un-calendar")["default"] || require("./components/un-calendar");
var UnCalendarMonthComponent = require("./components/un-calendar-month")["default"] || require("./components/un-calendar-month");
var UnCalendarTemplate = require("./components/un-calendar")["default"] || require("./components/un-calendar");
var UnCalendarInitializer = require("./initializers/un-calendar")["default"] || require("./initializers/un-calendar");
var Application = require("ember").Application;

Application.initializer(UnCalendarInitializer);

exports.UnCalendarInitializer = UnCalendarInitializer;
exports.UnCalendarComponent = UnCalendarComponent;
exports.UnCalendarMonthComponent = UnCalendarMonthComponent;
exports.UnCalendarTemplate = UnCalendarTemplate;
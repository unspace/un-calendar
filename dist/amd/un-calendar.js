define(
  ["./un-calendar-component","./un-calendar-month-component","./templates/un-calendar","ember","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    /*!
    un-calendar
    (c) 2014 Carsten Nielsen
    License: https://github.com/unspace/un-calendar/blob/master/LICENSE
    */

    var UnCalendarComponent = __dependency1__["default"] || __dependency1__;
    var UnCalendarMonthComponent = __dependency2__["default"] || __dependency2__;
    var UnCalendarTemplate = __dependency3__["default"] || __dependency3__;
    var Application = __dependency4__.Application;

    Application.initializer({
      name: 'ember-un-calendar',

      initialize: function(container) {
        container.register('template:components/un-calendar', UnCalendarTemplate);
        container.register('component:un-calendar', UnCalendarComponent);
        container.register('component:un-calendar-month', UnCalendarMonthComponent);
      }
    });

    __exports__.UnCalendarComponent = UnCalendarComponent;
    __exports__.UnCalendarMonthComponent = UnCalendarMonthComponent;
    __exports__.UnCalendarTemplate = UnCalendarTemplate;
  });
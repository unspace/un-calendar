define(
  ["./components/un-calendar","./components/un-calendar-month","./initializers/un-calendar","ember","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    /*!
    un-calendar
    (c) 2014 Carsten Nielsen
    License: https://github.com/unspace/un-calendar/blob/master/LICENSE
    */

    var UnCalendarComponent = __dependency1__["default"] || __dependency1__;
    var UnCalendarMonthComponent = __dependency2__["default"] || __dependency2__;
    var UnCalendarTemplate = __dependency1__["default"] || __dependency1__;
    var UnCalendarInitializer = __dependency3__["default"] || __dependency3__;
    var Application = __dependency4__.Application;

    Application.initializer(UnCalendarInitializer);

    __exports__.UnCalendarInitializer = UnCalendarInitializer;
    __exports__.UnCalendarComponent = UnCalendarComponent;
    __exports__.UnCalendarMonthComponent = UnCalendarMonthComponent;
    __exports__.UnCalendarTemplate = UnCalendarTemplate;
  });
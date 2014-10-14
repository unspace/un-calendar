define(
  ["../components/un-calendar","../components/un-calendar-month","../templates/un-calendar","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var UnCalendarComponent = __dependency1__["default"] || __dependency1__;
    var UnCalendarMonthComponent = __dependency2__["default"] || __dependency2__;
    var UnCalendarTemplate = __dependency3__["default"] || __dependency3__;

    __exports__["default"] = {
      name: 'un-calendar',

      initialize: function(container) {
        container.register('template:components/un-calendar', UnCalendarTemplate);
        container.register('component:un-calendar', UnCalendarComponent);
        container.register('component:un-calendar-month', UnCalendarMonthComponent);
      }
    };
  });
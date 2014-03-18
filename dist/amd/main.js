define(
  ["./ui-calendar-component","./ui-calendar-month-component","./ui-calendar-template","ember","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    /*!
    ember-ui-calendar
    (c) 2014 Carsten Nielsen
    License: https://github.com/heycarsten/ember-ui-calendar/blob/master/LICENSE
    */

    var UiCalendarComponent = __dependency1__.UiCalendarComponent;
    var UiCalendarMonthComponent = __dependency2__.UiCalendarMonthComponent;
    var UiCalendarTemplate = __dependency3__.UiCalendarTemplate;
    var Application = __dependency4__.Application;

    Application.initializer({
      name: 'ember-ui-calendar',

      initialize: function(container) {
        container.register('template:components/ui-calendar', UiCalendarTemplate);
        container.register('component:ui-calendar', UiCalendarComponent);
        container.register('component:ui-calendar-month', UiCalendarMonthComponent);
      }
    });

    __exports__.UiCalendarComponent = UiCalendarComponent;
    __exports__.UiCalendarMonthComponent = UiCalendarMonthComponent;
  });
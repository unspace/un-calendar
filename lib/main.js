/*!
un-calendar
(c) 2014 Carsten Nielsen
License: https://github.com/unspace/un-calendar/blob/master/LICENSE
*/

import UnCalendarComponent from './un-calendar-component';
import UnCalendarMonthComponent from './un-calendar-month-component';
import UnCalendarTemplate from './un-calendar-template';
import { Application } from 'ember';

Application.initializer({
  name: 'ember-un-calendar',

  initialize: function(container) {
    container.register('template:components/un-calendar', UnCalendarTemplate);
    container.register('component:un-calendar', UnCalendarComponent);
    container.register('component:un-calendar-month', UnCalendarMonthComponent);
  }
});

export {
  UnCalendarComponent,
  UnCalendarMonthComponent,
  UnCalendarTemplate
};

/*!
un-calendar
(c) 2014 Carsten Nielsen
License: https://github.com/unspace/un-calendar/blob/master/LICENSE
*/

import UnCalendarComponent from './un-calendar-component';
import UnCalendarMonthComponent from './un-calendar-month-component';
import UnCalendarTemplate from './templates/un-calendar';
import UnCalendarInitializer from './initializers/un-calendar';
import { Application } from 'ember';

Application.initializer(UnCalendarInitializer);

export {
  UnCalendarInitializer,
  UnCalendarComponent,
  UnCalendarMonthComponent,
  UnCalendarTemplate
};

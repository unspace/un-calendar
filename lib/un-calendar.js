/*!
un-calendar
(c) 2014 Carsten Nielsen
License: https://github.com/unspace/un-calendar/blob/master/LICENSE
*/

import UnCalendarComponent from './components/un-calendar';
import UnCalendarMonthComponent from './components/un-calendar-month';
import UnCalendarTemplate from './components/un-calendar';
import UnCalendarInitializer from './initializers/un-calendar';
import { Application } from 'ember';

Application.initializer(UnCalendarInitializer);

export {
  UnCalendarInitializer,
  UnCalendarComponent,
  UnCalendarMonthComponent,
  UnCalendarTemplate
};

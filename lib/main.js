/*!
ember-ui-calendar
(c) 2014 Carsten Nielsen
License: https://github.com/heycarsten/ember-ui-calendar/blob/master/LICENSE
*/

import UiCalendarComponent from './ui-calendar-component';
import UiCalendarMonthComponent from './ui-calendar-month-component';
import UiCalendarTemplate from './ui-calendar-template';
import { Application } from 'ember';

Application.initializer({
  name: 'ember-ui-calendar',

  initialize: function(container) {
    container.register('template:components/ui-calendar', UiCalendarTemplate);
    container.register('component:ui-calendar', UiCalendarComponent);
    container.register('component:ui-calendar-month', UiCalendarMonthComponent);
  }
});

export {
  UiCalendarComponent,
  UiCalendarMonthComponent,
  UiCalendarTemplate
};

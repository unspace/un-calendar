import UnCalendarComponent from '../un-calendar-component';
import UnCalendarMonthComponent from '../un-calendar-month-component';
import UnCalendarTemplate from '../templates/un-calendar';

export default {
  name: 'un-calendar',

  initialize: function(container) {
    container.register('template:components/un-calendar', UnCalendarTemplate);
    container.register('component:un-calendar', UnCalendarComponent);
    container.register('component:un-calendar-month', UnCalendarMonthComponent);
  }
};

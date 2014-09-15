import UnCalendarComponent from '../components/un-calendar';
import UnCalendarMonthComponent from '../components/un-calendar-month';
import UnCalendarTemplate from '../templates/un-calendar';

export default {
  name: 'un-calendar',

  initialize: function(container) {
    container.register('template:components/un-calendar', UnCalendarTemplate);
    container.register('component:un-calendar', UnCalendarComponent);
    container.register('component:un-calendar-month', UnCalendarMonthComponent);
  }
};

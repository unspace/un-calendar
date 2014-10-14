import moment from 'moment';
import Ember from 'ember';

function containsDate(dates, date) {
  if (!dates || !Ember.get(dates, 'length')) {
    return false;
  }

  return dates.any(function(d) {
    return date.isSame(d, 'day');
  });
}

function forEachSlot(month, iter) {
  var totalDays  = month.daysInMonth(),
      firstDay   = month.clone().startOf('month').weekday(),
      currentDay = 1;

  function popCurrentDay() {
    if (currentDay > totalDays) {
      return null;
    } else {
      return moment([month.year(), month.month(), currentDay++]);
    }
  }

  for (var week = 0; week <= 6; week++) {
    for (var day = 0; day <= 6; day++) {
      if (week === 0) {
        iter(day < firstDay ? null : popCurrentDay());
      } else {
        iter(currentDay <= totalDays ? popCurrentDay() : null);
      }
    }

    if (currentDay > totalDays) {
      break;
    }
  }
}

export default Ember.Component.extend({
  tagName:      'ol',
  classNames:   'un-calendar-month',
  month:         null,
  selectedDates: null,
  disabledDates: null,

  init: function() {
    this._super();

    if (!this.get('selectedDates')) {
      throw 'you must provide selectedDates to un-calendar-month';
    }
  },

  click: function(event) {
    var $target = Ember.$(event.target);

    if ($target.is('.is-disabled')) {
      return;
    }

    if ($target.is('[data-date]')) {
      this.sendAction('select', moment($target.data('date'), 'YYYY-MM-DD'));
    }
  },

  monthDidChange: function() {
    Ember.run.scheduleOnce('afterRender', this, 'rerender');
  }.observes('month'),

  selectedDatesDidChange: function() {
    Ember.run.scheduleOnce('afterRender', this, 'setSelectedDates');
  }.observes('selectedDates.@each'),

  setSelectedDates: function() {
    var dates = this.get('selectedDates'),
        view  = this,
        json;

    if (this.state !== 'inDOM') {
      return;
    }

    this.$('li').removeClass('is-selected');

    dates.forEach(function(date) {
      json = date.format('YYYY-MM-DD');
      view.$('[data-date="' + json + '"]').addClass('is-selected');
    });
  },

  didInsertElement: function() {
    this.setSelectedDates();
  },

  render: function(buff) {
    var month = this.get('month'),
        view  = this;

    if (!month) {
      return;
    }

    function renderSlot(slot) {
      var attrs, template;

      if (slot) {
        attrs = {
          date:       slot.format('D'),
          jsonDate:   slot.format('YYYY-MM-DD'),
          classNames: ['un-calendar-slot', 'un-calendar-day']
        };

        view.applyOptionsForDate(attrs, slot);

        template = '<li class="'+ attrs.classNames.join(' ') + '" data-date="' + attrs.jsonDate + '">' + attrs.date + '</li>';

        buff.push(template);
      } else {
        buff.push('<li class="un-calendar-slot un-calendar-empty"></li>');
      }
    }

    forEachSlot(month, function(slot) {
      renderSlot(slot);
    });
  },

  applyOptionsForDate: function(options, date) {
    var disabledDates = this.get('disabledDates'),
        selectedDates = this.get('selectedDates');

    if (moment().isSame(date, 'day')) {
      options.classNames.push('is-today');
    }

    if (disabledDates && containsDate(disabledDates, date)) {
      options.classNames.push('is-disabled');
    }

    if (selectedDates && containsDate(selectedDates, date)) {
      options.classNames.push('is-selected');
    }
  },
});

define("ember-ui-calendar",
  ["./ui-calendar-component","./ui-calendar-month-component","./ui-calendar-template","ember","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    /*!
    ember-ui-calendar
    (c) 2014 Carsten Nielsen
    License: https://github.com/heycarsten/ember-ui-calendar/blob/master/LICENSE
    */

    var UiCalendarComponent = __dependency1__["default"] || __dependency1__;
    var UiCalendarMonthComponent = __dependency2__["default"] || __dependency2__;
    var UiCalendarTemplate = __dependency3__["default"] || __dependency3__;
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
  });define("ember-ui-calendar/ui-calendar-component",
  ["moment","ember","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var moment = __dependency1__["default"] || __dependency1__;
    var Component = __dependency2__.Component;
    var computed = __dependency2__.computed;

    function cpFormatMoment(key, format) {
      return computed(function() {
        var date = this.get(key);
        return date ? date.format(format) : null;
      }).property(key);
    }

    __exports__["default"] = Component.extend({
      classNames: 'ui-calendar',

      prevLabel: '&larr;',
      nextLabel: '&rarr;',
      todayLabel: 'Today',
      showNextMonth: true,
      showPrevMonth: true,
      disableHeader: false,
      disableControls: false,
      disableTodayButton: false,

      multiple:      false,
      disablePast:   null,
      disableFuture: null,
      maxPastDate:   null,
      maxFutureDate: null,
      month:         null,
      disabledDates: null,
      selectedDates: null,
      selectedDate:  null,

      init: function() {
        this._super();

        if (!this.get('selectedDates')) {
          this.set('multiple', false);
          this.set('selectedDates', []);
        }

        if (this.get('selectedDate')) {
          this.get('selectedDates').addObject(this.get('selectedDate'));
        }

        var firstSelectedDate = this.get('selectedDates.firstObject');

        if (!this.get('month') && firstSelectedDate) {
          this.set('month', firstSelectedDate.clone().startOf('month'));
        }

        if (!this.get('month')) {
          this.set('month', moment().startOf('month'));
        }
      },

      actions: {
        dateSelected: function(date) {
          if (this.get('multiple')) {
            this.get('selectedDates').removeObject(date);
            this.get('selectedDates').addObject(date);
          } else {
            this.set('selectedDate', date);
          }

          this.sendAction('select', date);
        },

        prev: function() {
          var month = this.get('month');

          if (!month || this.get('isPrevDisabled')) {
            return;
          }

          this.set('month', month.clone().subtract('months', 1));
        },

        next: function() {
          var month = this.get('month');

          if (!month || this.get('isNextDisabled')) {
            return;
          }

          this.set('month', month.clone().add('months', 1));
        },

        today: function() {
          this.set('month', moment());
        }
      },

      selectedDateWillChange: function() {
        this.get('selectedDates').removeObject(this.get('selectedDate'));
      }.observesBefore('selectedDate'),

      selectedDateDidChange: function() {
        this.get('selectedDates').addObject(this.get('selectedDate'));
      }.observes('selectedDate'),

      // TODO: Add timer to invalidate this
      now: function() {
        return moment();
      }.property(),

      prevMonth: function() {
        var month = this.get('month');
        return month ? month.clone().subtract('months', 1) : null;
      }.property('month'),

      nextMonth: function() {
        var month = this.get('month');
        return month ? month.clone().add('months', 1) : null;
      }.property('month'),

      isNextMonthInFuture: function() {
        var nextMonth = this.get('nextMonth'),
            now       = this.get('now');

        return nextMonth ? nextMonth.isAfter(now, 'month') : false;
      }.property('nextMonth', 'now'),

      isPrevMonthInPast: function() {
        var prevMonth = this.get('prevMonth'),
            now       = this.get('now');

        return prevMonth ? prevMonth.isBefore(now, 'month') : false;
      }.property('prevMonth', 'now'),

      isPrevMonthBeyondMax: function() {
        var prevMonth   = this.get('prevMonth'),
            maxPastDate = this.get('maxPastDate');

        if (!prevMonth || !maxPastDate) {
          return false;
        }

        return prevMonth.isBefore(maxPastDate, 'month');
      }.property('prevMonth', 'maxPastDate'),

      isNextMonthBeyondMax: function() {
        var nextMonth     = this.get('nextMonth'),
            maxFutureDate = this.get('maxFutureDate');

        if (!nextMonth || !maxFutureDate) {
          return false;
        }

        return nextMonth.isAfter(maxFutureDate, 'month');
      }.property('nextMonth', 'maxFutureDate'),

      isPrevDisabled: function() {
        if (this.get('isPrevMonthBeyondMax')) {
          return true;
        }

        if (this.get('disablePast') && this.get('isPrevMonthInPast')) {
          return true;
        }

        return false;
      }.property('isPrevMonthBeyondMax', 'isPrevMonthInPast', 'disablePast'),

      isNextDisabled: function() {
        if (this.get('isNextMonthBeyondMax')) {
          return true;
        }

        if (this.get('disableFuture') && this.get('isNextMonthInFuture')) {
          return true;
        }

        return false;
      }.property('isNextMonthBeyondMax', 'isNextMonthInFuture', 'disableFuture'),

      prevMonthLabel: cpFormatMoment('prevMonth', 'MMMM YYYY'),
      nextMonthLabel: cpFormatMoment('nextMonth', 'MMMM YYYY'),
      monthLabel:     cpFormatMoment('month', 'MMMM YYYY')
    });
  });define("ember-ui-calendar/ui-calendar-month-component",
  ["handlebars","moment","ember","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Handlebars = __dependency1__["default"] || __dependency1__;
    var moment = __dependency2__["default"] || __dependency2__;
    var Component = __dependency3__.Component;
    var $ = __dependency3__.$;
    var run = __dependency3__.run;
    var get = __dependency3__.get;

    var DATE_SLOT_HBS = Handlebars.compile(
      '<li class="{{classNames}}" data-date="{{jsonDate}}">' +
        '{{date}}' +
      '</li>'
    );

    function containsDate(dates, date) {
      if (!dates || !get(dates, 'length')) {
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

    __exports__["default"] = Component.extend({
      tagName:      'ol',
      classNames:   'ui-calendar-month',
      month:         null,
      selectedDates: null,
      disabledDates: null,

      init: function() {
        this._super();

        if (!this.get('selectedDates')) {
          throw 'you must provide selectedDates to ui-calendar-month';
        }
      },

      click: function(event) {
        var $target = $(event.target);

        if ($target.is('.is-disabled')) {
          return;
        }

        if ($target.is('[data-date]')) {
          this.sendAction('select', moment($target.data('date'), 'YYYY-MM-DD'));
        }
      },

      monthDidChange: function() {
        run.scheduleOnce('afterRender', this, 'rerender');
      }.observes('month'),

      selectedDatesDidChange: function() {
        run.scheduleOnce('afterRender', this, 'setSelectedDates');
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
          var attrs;

          if (slot) {
            attrs = {
              date:       slot.format('D'),
              jsonDate:   slot.format('YYYY-MM-DD'),
              classNames: ['ui-calendar-slot', 'ui-calendar-day']
            };

            view.applyOptionsForDate(attrs, slot);
            attrs.classNames = attrs.classNames.join(' ');
            buff.push(DATE_SLOT_HBS(attrs));
          } else {
            buff.push('<li class="ui-calendar-slot ui-calendar-empty"></li>');
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
  });define("ember-ui-calendar/ui-calendar-template",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#unless disableHeader}}\n  <div class=\"ui-calendar-header\">\n    {{#unless disableControls}}\n      <nav>\n        <button {{action \"prev\"}} {{bind-attr disabled=\"isPrevDisabled\"}} class=\"ui-calendar-prev\">\n          <span>{{{unbound prevLabel}}}</span>\n        </button>\n        <button {{action \"next\"}} {{bind-attr disabled=\"isNextDisabled\"}} class=\"ui-calendar-next\">\n          <span>{{{unbound nextLabel}}}</span>\n        </button>\n        {{#unless disableTodayButton}}\n          <button {{action \"today\"}} class=\"ui-calendar-today\">\n            <span>{{{unbound todayLabel}}}</span>\n          </button>\n        {{/unless}}\n      </nav>\n    {{/unless}}\n  </div>\n{{/unless}}\n\n<div class=\"ui-calendar-months\">\n  {{#if showPrevMonth}}\n    <div class=\"ui-calendar-prev-month ui-calendar-month-container\">\n      <header>\n        {{prevMonthLabel}}\n      </header>\n      {{ui-calendar-month\n        month=prevMonth\n        selectedDates=selectedDates\n        disabledDates=disabledDates\n        select=\"dateSelected\"}}\n    </div>\n  {{/if}}\n\n  <div class=\"ui-calendar-current-month ui-calendar-month-container\">\n    <header>\n      {{monthLabel}}\n    </header>\n    {{ui-calendar-month\n      month=month\n      selectedDates=selectedDates\n      disabledDates=disabledDates\n      select=\"dateSelected\"}}\n  </div>\n\n  {{#if showNextMonth}}\n    <div class=\"ui-calendar-next-month ui-calendar-month-container\">\n      <header>\n        {{nextMonthLabel}}\n      </header>\n      {{ui-calendar-month\n        month=nextMonth\n        selectedDates=selectedDates\n        disabledDates=disabledDates\n        select=\"dateSelected\"}}\n    </div>\n  {{/if}}\n</div>\n");
  });
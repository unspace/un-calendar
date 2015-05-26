!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),(n.Un||(n.Un={})).Calendar=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
var moment = window.moment["default"] || window.moment;
var Ember = window.Ember["default"] || window.Ember;

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

exports["default"] = Ember.Component.extend({
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

    if (this._state !== 'inDOM') {
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
},{}],2:[function(_dereq_,module,exports){
"use strict";
var moment = window.moment["default"] || window.moment;
var Ember = window.Ember["default"] || window.Ember;

function cpFormatMoment(key, format) {
  return Ember.computed(function() {
    var date = this.get(key);
    return date ? date.format(format) : null;
  }).property(key);
}

exports["default"] = Ember.Component.extend({
  classNames: 'un-calendar',

  prevLabel:           '&larr;',
  nextLabel:           '&rarr;',
  todayLabel:          'Today',
  showNextMonth:       true,
  showPrevMonth:       true,
  disableHeader:       false,
  disableControls:     false,
  disableTodayButton:  false,
  multiple:            false,
  disablePast:         null,
  disableFuture:       null,
  disableManipulation: null,
  maxPastDate:         null,
  maxFutureDate:       null,
  month:               null,
  disabledDates:       null,
  selectedDates:       null,
  selectedDate:        null,

  init: function() {
    this._super();

    if (!this.get('selectedDates')) {
      this.set('selectedDates', []);
    } else {
      this.set('multiple', true);
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
      this.sendAction('select', date);

      if (this.get('disableManipulation')) {
        return;
      }

      if (this.get('multiple')) {
        if (this.hasDate(date)) {
          this.removeDate(date);
        } else {
          this.addDate(date);
        }
      } else {
        if (this.hasDate(date)) {
          this.set('selectedDate', null);
        } else {
          this.set('selectedDate', date);
        }
      }
    },

    prev: function() {
      var month = this.get('month');

      if (!month || this.get('isPrevDisabled')) {
        return;
      }

      this.set('month', month.clone().subtract(1, 'months'));
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

  hasDate: function(date) {
    return this.get('selectedDates').any(function(d) {
      return d.isSame(date);
    });
  },

  removeDate: function(date) {
    var dates = this.get('selectedDates');
    var removeDates;

    removeDates = dates.filter(function(d) {
      return d.isSame(date);
    });

    dates.removeObjects(removeDates);
  },

  addDate: function(date) {
    this.removeDate(date);
    this.get('selectedDates').pushObject(date);
  },

  selectedDateWillChange: function() {
    this.removeDate(this.get('selectedDate'));
  }.observesBefore('selectedDate'),

  selectedDateDidChange: function() {
    var date = this.get('selectedDate');

    if (!date) {
      return;
    }

    this.addDate(this.get('selectedDate'));
  }.observes('selectedDate'),

  // TODO: Add timer to invalidate this
  now: function() {
    return moment();
  }.property(),

  prevMonth: function() {
    var month = this.get('month');
    return month ? month.clone().subtract(1, 'months') : null;
  }.property('month'),

  nextMonth: function() {
    var month = this.get('month');
    return month ? month.clone().add(1, 'months') : null;
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
},{}],3:[function(_dereq_,module,exports){
"use strict";
var UnCalendarComponent = _dereq_("../components/un-calendar")["default"] || _dereq_("../components/un-calendar");
var UnCalendarMonthComponent = _dereq_("../components/un-calendar-month")["default"] || _dereq_("../components/un-calendar-month");
var UnCalendarTemplate = _dereq_("../templates/un-calendar")["default"] || _dereq_("../templates/un-calendar");

exports["default"] = {
  name: 'un-calendar',

  initialize: function(container) {
    container.register('template:components/un-calendar', UnCalendarTemplate);
    container.register('component:un-calendar', UnCalendarComponent);
    container.register('component:un-calendar-month', UnCalendarMonthComponent);
  }
};
},{"../components/un-calendar":2,"../components/un-calendar-month":1,"../templates/un-calendar":4}],4:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;
exports["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n  <div class=\"un-calendar-header\">\n    ");
  stack1 = helpers.unless.call(depth0, "disableControls", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </div>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n      <nav>\n        <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "prev", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("isPrevDisabled")
  },hashTypes:{'disabled': "STRING"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"un-calendar-prev\">\n          <span>");
  stack1 = helpers.unbound.call(depth0, "prevLabel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n        </button>\n        <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "next", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("isNextDisabled")
  },hashTypes:{'disabled': "STRING"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"un-calendar-next\">\n          <span>");
  stack1 = helpers.unbound.call(depth0, "nextLabel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n        </button>\n        ");
  stack1 = helpers.unless.call(depth0, "disableTodayButton", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </nav>\n    ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n          <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "today", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"un-calendar-today\">\n            <span>");
  stack1 = helpers.unbound.call(depth0, "todayLabel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n          </button>\n        ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n    <div class=\"un-calendar-prev-month un-calendar-month-container\">\n      <header>\n        ");
  stack1 = helpers._triageMustache.call(depth0, "prevMonthLabel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </header>\n      ");
  data.buffer.push(escapeExpression((helper = helpers['un-calendar-month'] || (depth0 && depth0['un-calendar-month']),options={hash:{
    'month': ("prevMonth"),
    'selectedDates': ("selectedDates"),
    'disabledDates': ("disabledDates"),
    'select': ("dateSelected")
  },hashTypes:{'month': "ID",'selectedDates': "ID",'disabledDates': "ID",'select': "STRING"},hashContexts:{'month': depth0,'selectedDates': depth0,'disabledDates': depth0,'select': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "un-calendar-month", options))));
  data.buffer.push("\n    </div>\n  ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n    <div class=\"un-calendar-next-month un-calendar-month-container\">\n      <header>\n        ");
  stack1 = helpers._triageMustache.call(depth0, "nextMonthLabel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </header>\n      ");
  data.buffer.push(escapeExpression((helper = helpers['un-calendar-month'] || (depth0 && depth0['un-calendar-month']),options={hash:{
    'month': ("nextMonth"),
    'selectedDates': ("selectedDates"),
    'disabledDates': ("disabledDates"),
    'select': ("dateSelected")
  },hashTypes:{'month': "ID",'selectedDates': "ID",'disabledDates': "ID",'select': "STRING"},hashContexts:{'month': depth0,'selectedDates': depth0,'disabledDates': depth0,'select': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "un-calendar-month", options))));
  data.buffer.push("\n    </div>\n  ");
  return buffer;
  }

  stack1 = helpers.unless.call(depth0, "disableHeader", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n<div class=\"un-calendar-months\">\n  ");
  stack1 = helpers['if'].call(depth0, "showPrevMonth", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n  <div class=\"un-calendar-current-month un-calendar-month-container\">\n    <header>\n      ");
  stack1 = helpers._triageMustache.call(depth0, "monthLabel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </header>\n    ");
  data.buffer.push(escapeExpression((helper = helpers['un-calendar-month'] || (depth0 && depth0['un-calendar-month']),options={hash:{
    'month': ("month"),
    'selectedDates': ("selectedDates"),
    'disabledDates': ("disabledDates"),
    'select': ("dateSelected")
  },hashTypes:{'month': "ID",'selectedDates': "ID",'disabledDates': "ID",'select': "STRING"},hashContexts:{'month': depth0,'selectedDates': depth0,'disabledDates': depth0,'select': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "un-calendar-month", options))));
  data.buffer.push("\n  </div>\n\n  ");
  stack1 = helpers['if'].call(depth0, "showNextMonth", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n");
  return buffer;
  
});
},{}],5:[function(_dereq_,module,exports){
"use strict";
/*!
un-calendar
(c) 2014 Carsten Nielsen
License: https://github.com/unspace/un-calendar/blob/master/LICENSE
*/

var UnCalendarComponent = _dereq_("./components/un-calendar")["default"] || _dereq_("./components/un-calendar");
var UnCalendarMonthComponent = _dereq_("./components/un-calendar-month")["default"] || _dereq_("./components/un-calendar-month");
var UnCalendarTemplate = _dereq_("./components/un-calendar")["default"] || _dereq_("./components/un-calendar");
var UnCalendarInitializer = _dereq_("./initializers/un-calendar")["default"] || _dereq_("./initializers/un-calendar");
var Application = window.Ember.Application;

Application.initializer(UnCalendarInitializer);

exports.UnCalendarInitializer = UnCalendarInitializer;
exports.UnCalendarComponent = UnCalendarComponent;
exports.UnCalendarMonthComponent = UnCalendarMonthComponent;
exports.UnCalendarTemplate = UnCalendarTemplate;
},{"./components/un-calendar":2,"./components/un-calendar-month":1,"./initializers/un-calendar":3}]},{},[5])
(5)
});
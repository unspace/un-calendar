define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
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
  });
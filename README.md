# Un Calendar

## Warning: works only with Ember <= 1.10

*This project is currently unmaintained but we'll still accept all the PR love you want to give us!*

#### A calendar component for Ember with a _speedy_ month view

### Rationale

HTMLBars looks very promising for template performance, but it's not here yet.
I wanted a solution to the month view problem that was light-weight,
Ember-based, and that didn't have redundant third-party dependencies. Existing
implementations either wrap a third-party library or take an idiomatic Ember
approach, which will likely be absolutely fine in the HTMLBars future, but right
now it's just not quick enough.

### Features

- Shows a month with _n_ selected days, _n_ disabled days
- Can also show the previous month and future month
- Lets the user move forward and backwards
- Lets the user go to the current month
- Sends an action when the user clicks a day
- Ability to disable moving past the current month into the future or past
- Ability to disable user-controls in general
- Renders quickly

### Using It

_**A wild (OUTDATED) [calendar demo](http://emberjs.jsbin.com/komop/2/) appears!**_

You can use the builds provided in the [`dist`](/dist) directory, if you don't
know why there is a dist directory and just want a file to plop into your app
you probably want [`dist/globals/un-calendar.js`](/dist/globals/un-calendar.js). There is also
a very basic CSS file that you can use as a starting point for styling the
calendar and month components located in
[`dist/un-calendar.css`](/dist/un-calendar.css).

The `un-calendar` component wraps everything up into a widget that you can use
to display a calendar and allow you users to select one or _n_ dates:

```html
{{un-calendar
  month=momentObject
  selectedDate=momentObject
  selectedDates=arrayOfMomentObjects
  disabledDates=arrayOfMomentObjects
  todayLabel="<span>Today</span>"
  prevLabel="<span>Raw HTML</span>"
  nextLabel="<span>Raw HTML</span>"
  showNextMonth=true|false
  showPrevMonth=true|false
  disableHeader=true|false
  disableControls=true|false
  disablePast=true|false,
  disableFuture=true|false
  disableManipulation=true|false
  maxPastDate=momentObject
  maxFutureDate=momentObject
  select="dateSelected"}}
```

| Option            | Type             | Description                           |
|:------------------|:-----------------|:--------------------------------------|
| `month`           | moment           | The explicit month to render.         |
| `selectedDate`    | moment           | Date to indicate as selected.         |
| `selectedDates`   | array of moments | Dates to indicate as selected, use this or the above, both won't work. |
| `disabledDates`   | array of moments | Dates to indicate as disabled.        |
| `todayLabel`      | HTML string      | A label to use for the Today button   |
| `prevLabel`       | HTML string      | A label to use for the previous month button |
| `nextLabel`       | HTML string      | A label to use for the next month button |
| `showNextMonth`   | boolean          | Show or hide the next month button    |
| `showPrevMonth`   | boolean          | Show or hide the previous month button |
| `disableHeader`   | boolean          | Show or hide the header               |
| `disableControls` | boolean          | Show or hide the header controls      |
| `disablePast`     | boolean          | Disable moving to past months         |
| `disableFuture`   | boolean          | Disable moving to future months       |
| `disableManipulation` | boolean       | Disable built-in manipulation of `selectedDate` / `selectedDates` select action still sent |
| `maxPastDate`     | moment           | Maximum past month                    |
| `maxFutureDate`   | moment           | Maximum future month                  |
| `select`          | action name      | Will fire this event with the selected moment when the user selects a date |

The `un-month` component is what powers the individual month views, you can use
it if you want to build your own calendar functionality:

```html
{{un-month
  month=momentObject
  selectedDates=arrayOfMomentObjects
  disabledDates=arrayOfMomentObjects
  select="dateSelected"}}
```

### `ember-cli` add-on

To use as an add-on in `ember-cli`, add it to `package.json`:

```
$ npm install --save-dev un-calendar
```

Then run the generator to add `moment.js` to your `bower.json`:

```
$ ember generate un-calendar
```

`un-calendar` provides a module shim for `moment.js`. This allows you to import
it using ES6 syntax instead of relying on the global. For instance, if you were
defining a custom transform

```javascript
// app/transforms/moment.js
import DS from 'ember-data';
import moment from 'moment';

export default DS.Transform.extend({
  serialize: function(deserialized) {
    return deserialized.format('YYYY-MM-DD');
  },

  deserialize: function(serialized) {
    return moment(serialized);
  }
});

// app/models/event.js
import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('model')
});

```

The default css will be automatically required, you can override the default styles in your own css or set

```
unCalendar: {
  defaultStyles: false
}
```

in your `Brocfile` inside the options passed to `new EmberApp`.
### Development

Install the project dev dependencies.
```sh
$ npm install
```

Then install the Bower dependencies:

```sh
$ npm install -g bower # if you don't have Bower installed on your system
$ bower install
```

After that you can run:

```sh
$ npm install -g broccoli-cli # if you don't have Broccoli CLI on your system
$ broccoli serve
```

Then either play around with one of the [examples](/examples) or fire up the
test runner and add some tests:

```sh
$ testem # Then follow the instructions
```

### Credits

Many thanks to @ecbypi for doing the bulk of the work that made `un-calendar` an `ember-cli-addon`.

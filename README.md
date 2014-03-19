# Ember UI Calendar

#### A calendar component for Ember with a _speedy_ month view

### Rationale

HTMLBars looks very promising for template performance, but it's not with us
yet. I needed to solve the month view problem in a light-weight Ember way
without needing redundant third-party dependencies. Existing implementations
either wrap a third-party library or take an idiomatic Ember approach, which
will be absolutely fine in the HTMLBars future, but right now it's just too
slow for my use-cases.

### Features

- Shows a month with _n_ selected days, _n_ disabled days
- Also show the previous month and future month
- Let the user move forward and backwards
- Let the user go to the current month
- Send an event when the user selects a day
- Disable moving past the current month into the future or past
- Disable user-controls in general

### Development

Install the project dev dependencies, it will load about 50,000 microframeworks
into `node_modules`.

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
test runner:

```sh
$ testem # Then follow the instructions
```

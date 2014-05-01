moduleForComponent('un-calendar', 'UiCalendar', {
  needs: [
    'component:un-calendar-month'
  ]
});

test('renders', function(){
  expect(2)
  var calendar = this.subject();
  equal(calendar.state, 'preRender');
  this.append();
  equal(calendar.state, 'inDOM');
});

moduleForComponent('ui-calendar-component');

test('renders', function(){
  expect(2)
  var calendar = this.subject();
  equal(calendar.state, 'preRender');
  this.append();
  equal(calendar.state, 'inDOM');
});

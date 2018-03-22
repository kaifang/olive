### Bind creates a new function that will have this set to the first parameter passed to bind()

```
var Button = function(content) { 
  this.content = content;
};
Button.prototype.click = function() {
  console.log(this.content + ' clicked');
};

var myButton = new Button('OK');
myButton.click();

var looseClick = myButton.click;
looseClick(); // not bound, 'this' is not myButton - it is the global object

var boundClick = myButton.click.bind(myButton);
boundClick(); // bound, 'this' is myButton
```
Which prints out:

```
OK clicked
undefined clicked
OK clicked
```

### add extra parameters after the 1st (this) parameter and bind will pass in those values to the original function. 
Any additional parameters you later pass to the bound function will be passed in after the bound parameters:
```
// Example showing binding some parameters
var sum = function(a, b) {
  return a + b;
};

var add5 = sum.bind(null, 5);
console.log(add5(10));
```

Which prints out:
```
15
```

### pass parameters from event handlers. 
If you have this react code: 
```
var Note = React.createClass({ 
add: function(text){ ... }, 
render: function () { return <button onClick={this.add.bind(null, "New Note")}/> } }, 
```
then when the button is clicked, it will pass a parameter text "New Note" to the add method.

### ES5 adds support for => functions.  
Arrow functions are more compact and do not change the this pointer from their defining scope, so you may not need to use bind() as often.

```
Button.prototype.hookEvent(element) {
  // Use bind() to ensure 'this' is the 'this' inside click()
  element.addEventListener('click', this.click.bind(this));
};
```

Or:
```
Button.prototype.hookEvent(element) {
  // Use a new variable for 'this' since 'this' inside the function
  // will not be the 'this' inside hookEvent()
  var me = this;
  element.addEventListener('click', function() { me.click() });
}
```

Or:
```
Button.prototype.hookEvent(element) {
  // => functions do not change 'this', so you can use it directly
  element.addEventListener('click', () => this.click());
}
```

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

##### for example: pass parameters from event handlers. 
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

```
Button.prototype.hookEvent(element) {
  // => functions do not change 'this', so you can use it directly
  element.addEventListener('click', () => this.click());
}
```

note: 
An arrow function does not have its own `this`; the `this` value of the enclosing execution context is used. 
If you used `Arrow function` to define `callback`, it gets the context of the enclosing React component.


### Is there any difference?
```
<div onClick={()=>{this.props.onClick()}}>Previous</div>
<div onClick={this.props.onClick}>Previous</div>
```
since you just wish to execute callback function and do not want to pass any data,  there is no diff. The first one is simply useless and will only add to performance implication.


### callback as a class field

#### old:
```
myHandler(){
  //  this.setState(...)
}
```
You will need to explicit bind it to the class:

```
constructor(props){
  super(props);
  this.myHandler = this.myHandler.bind(this);
}
```

#### new: arrow function (use a lexical context for this), no need to do Bind

```
myHandler = () => {
  //  this.setState(...)
}
```

With both approaches you will use the handler like this: 

```
<div onClick={this.myHandler}></div> 
```

if you want to pass parameters to the handler, then

```
<div onClick={() => this.myHandler(someParameter)}></div>
```

This will create a new function instance on each render. There is a better approach for this.


## even if you have to pass some additional data to these function from ThirdClass and SecondClass, you shouldn't directly use Arrow function or bind in render.

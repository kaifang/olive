In html
```
<button onclick="myFunction()">Click me</button>
```
In JavaScript:
```
object.onclick = function(){myScript};

// or use the addEventListener() method:
object.addEventListener("click", myScript);
```

You will mainly use anonymous functions to just run a load of code in response to an event firing 
— like a button being clicked — using an event handler. 

In JavaScript:
```
var myButton = document.querySelector('button');

myButton.onclick = function() {
  alert('hello');
}
```

```
<button onClick={() => alert('click')}>Click me</button>
```
This uses the new JavaScript arrow function syntax. Note that we’re passing a function as the onClick prop. 
Doing `onClick={alert('click')}` would alert immediately instead of when the button is clicked.

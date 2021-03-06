### onclick vs addEventListener

### callback using function reference or wrapper function (anonymous, arrow)

```
function modifyText(new_text) {
  var t2 = document.getElementById("t2");
  t2.firstChild.nodeValue = new_text;    
}

var element = document.querySelector('button');

// (1) Passing a function reference - do not add '()' after it, which would call the function!
element.onclick = modifyText;

var el = document.getElementById("sometag");
el.addEventListener("click", modifyText, false);

// (2) Using a function expression 
//  anonymous function
element2.onclick = function() {
  alert('click');
};

// If you want to pass parameters to the listener function, you may use 
// (2-1) anonymous function. 
el.addEventListener("click", function(){modifyText("Hi World!")}, false);

// (2-2) arrow function
el.addEventListener("click", () => { modifyText("Hi World!"); }, false);

```
Please note that while anonymous and arrow functions are similar, they have different `this` bindings.


### Bug1: auto fire, without clicking?!
Passing a function reference - do not add '()' after it, which would call the function!
```
//React code:
<button onClick={() => alert('click')}>Click me</button>
```
Note that we’re passing a function as the onClick prop. 
Doing `onClick={alert('click')}` would alert immediately instead of when the button is clicked.

Note, React always use function ref for the onClick.

```
class Button extends React.Component {
  handleClick = () => {
    this.props.onClickFunction(this.props.incrementValue);
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        +{this.props.incrementValue}
      </button>
    );
  }
}
```

### Bug2: add Listener too late
If an EventListener is added to an EventTarget while it is processing an event, that event does not trigger the listener. However, that same listener may be triggered during a later stage of event flow, such as the bubbling phase.

solution: see EventListener.md, use Promise

### Bug3: `this` undefined
solution: see bind.md

### Bug4:  
you cannot remove the listener with bind. 

### Bug5: Memory issues
solution 1: set the passive option , prevents the listener from blocking page rendering while a user is scrolling.
solution 2: use debouncing and throttling


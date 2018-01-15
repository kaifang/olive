//Problem: 
// we cannot control how often those DOM events are going to be emitted. 
// It is a bad idea to directly attach expensive functions to the scroll event.

//Solution: debouncing and throttling as a way to improve page speed and performance, specially useful in event handlers.

//Imagine you are in an elevator. The doors begin to close, and suddenly another person tries to get on. 
//The elevator doesn't begin its function to change floors, the doors open again. 
//Now another person comes in. The elevator is delaying its function (moving floors), but optimizing its resources.
//Debounce: "grouping multiple events in one".

//Throttle: Think of it as a valve, it regulates the flow of the executions. 
//We can determine the maximum number of times a function can be called in certain time. 
//So in the elevator analogy.. you are polite enough to let people in for 10 secs, but once that delay passes, you must go!

//Debounce: group several function calls into one and execute it only once after some time has elapsed.

// debounce function that will wrap our event
function debounce_foo(fn, delay) {
  let timeout = null;
  // closure function that has access to timer
  return function () {
    // get the scope and parameters of the function 
    // via 'this' and 'arguments'
    const context = this;
    const args = arguments;
    // if event is called, clear the timer and start over
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
    // or simply
    //timeout = setTimeout(() => fn.apply(context, args), delay)
  }
}

// function to be called when user scrolls
function foo() {
  console.log('You are scrolling!');
}

/*
// wrap our function in a debounce to fire once 2 seconds have gone by
let elem = document.getElementById('container');
elem.addEventListener('scroll', debounce_foo(foo, 2000));
*/

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
//_.debounce = function(func, delay, immediate) {
function debounce_something(func, delay, immediate) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);

    const callNow = immediate && !timeout;
    if (callNow) func.apply(context, args);
  };
};

/*
// WRONG - A common pitfall is to call the _.debounce function more than once
$(window).on('scroll', function() {
   _.debounce(doSomething, 300); 
});

// RIGHT
$(window).on('scroll', _.debounce(doSomething, 200));
*/

  /*
  Throttling is another technique that’s is similar to debouncing, 
  except that instead of waiting for some time to pass by before calling a function, 
  throttling just spreads the function calls across a longer time interval. 
  So if an event occurs 10 times within 100 milliseconds, throttling could spread out each of 
  the function calls to be executed once every 2 seconds instead of all firing within 100 milliseconds.
  */

  /*
  throttle: Guaranteeing a constant flow of executions every X milliseconds. 
  Like checking every 200ms your scroll position to trigger a CSS animation.
  */
  const throttle = (func, limit) => {
    let inThrottle
    return function() {
      const context = this
      const args = arguments
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }

  /*
  throttleBtn.addEventListener('click', throttle(function() {
    return console.log('Hey! It is', new Date().toUTCString());
  }, 1000));
  */

// But what about our last invocation? If it’s in the limit period it will be ignored and maybe that’s not what we want.
// Below is the fix. It ensures that we catch and execute that last invocation at the correct time.
  const throttle_better = (func, limit) => {
    let inThrottle
    let lastFunc
    let lastRan
    return function() {
      const context = this
      const args = arguments
      if (!inThrottle) {
        func.apply(context, args)
        lastRan = Date.now()
        inThrottle = true
        // note: do not setTimeout here
      } else {
        clearTimeout(lastFunc)
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            // do func here if time has passed limit 
            func.apply(context, args)
            lastRan = Date.now()
          }
        }, limit - (Date.now() - lastRan))
      }
    }
  }

/* rAF
requestAnimationFrame: a throttle alternative. 
When your function recalculates and renders elements on screen and you want to guarantee smooth changes or animations. 
*/


/*
  It can be tempting to build your own debounce/throttle function, or copy it from some random blog post. 
  The recommendation is to use underscore or Lodash or jQuery Plugin.  
*/

/*
Use cases for debounce
Use it to discard a number of fast-pace events until the flow slows down. 
Examples:
1) When typing fast in a textarea that will be processed: you don't want to start to process the text until user stops typing.
2) When saving data to the server via AJAX: You don't want to spam your server with dozens of calls per second.

Use cases for throttle
Same use cases than debounce, but you want to warranty that there is at least some execution of the callbacks at certain interval

1) If that user types really fast for 30 secs, maybe you want to process the input every 5 secs.
2) It makes a huge performance difference to throttle handling scroll events. A simple mouse-wheel movement can trigger dozens of events in a second. 
Even Twitter had once problems with scroll events, so learn from others mistake and avoid this easy pitfall.
*/
//A JavaScript closure is when an inner function has access to its outer enclosing function's variables.

//this is a function within an outer function that allows you to update a private variable 
//but the variable wouldn't be accessible from outside the function without the use of a helper function.
function counter() {
  var _counter = 0;
  // return an object with several functions that allow you
  // to modify the private _counter variable
  return {
    add: function(increment) { _counter += increment; },
    retrieve: function() { return 'The counter is currently at: ' + _counter; }
  }
}

// error if we try to access the private variable like below
// _counter;

var c = counter();
c.add(7); 
c.add(8); 
c.retrieve(); // =>  15
console.log(c.retrieve());

////////////// 
//Alternatively, use anonymous function:

var counter=function() {
  var _counter=0;
  return {
    add: function(num) { _counter +=num; },
    retrieve: function() { return "the value of counter is: "+_counter; }
  };	
};

var c=counter();
c.add(8);
c.add(6);
c.retrieve(); // => 14
console.log(c.retrieve());

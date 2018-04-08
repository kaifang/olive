//Typical closure problem. 
//When setTimeout() executes after 3s, it's going to use the value of i at that time, because the function closes over the values 
//from the surrounding block.
//Kai: closure is when an inner function has access to its outer enclosing function's variables. 
//Here setTimeout() function creates a function (the closure) that has access to its outer scope variable i
const arr = ['a', 'b', 'c', 'd'];
for (var i = 0; i < arr.length; i++) {
    setTimeout(function() {
        console.log('Index: ' + i + ', value: ' + arr[i]);
    }, 3000);
}

//Index: 4, value: undefined
//Index: 4, value: undefined
//Index: 4, value: undefined
//Index: 4, value: undefined

//1. ES6 way:
console.log('-------1--------');
for (let i = 0; i < arr.length; i++) {
    setTimeout(function() {
        console.log('(1) Index: ' + i + ', value: ' + arr[i]);
    }, 3000);
}

// Or even better:
//const arr = [10, 12, 15, 21];
//for (const i of arr) {
//    ...
//}

//---------------------------
/* 
Old-school way to fix it:  
create a wrapper function expression, passing the needed parameters into the inner function, do not use outer scope variables.
using an IIFE, an immediately-invoked function expression.
also referred to as a self-executing anonymous function.

IIFE may be written in a number of different ways:
*/

// A common convention is to enclose the function expression in parentheses:
//   ( function () { /* ... */ } )  ();
//   ( function () { /* ... */ }   ()  );
//   (  () =>      { /* ... */ } )  ();   //  ES6 arrow function, parentheses only allowed on outside

// In contexts where an expression is expected, wrapping parentheses is not necessary:
// var f = function () { /* ... */ }();
// true && function () { /* ... */ }();

//-----------------------------


//2. wrap setTimeout()
console.log('-------2--------');  // <-- not useful, immediately-invoked 
for( var i = 0;  i < arr.length;  i++ ) {
    delayLog(arr, i);
}
function delayLog(list, index) {
    setTimeout( function() {
        console.log( '(2) Index: ' + index + ', value: ' + list[index] );
    }, 3000 );
}

//3. or better, it doesn't have to be a named function.
console.log('-------3--------');  // <-- not useful, immediately-invoked
for (var i = 0; i < arr.length; i++) {
    (function(list, i_local) {
        setTimeout(function() {
            console.log('(3) Index: ' + i_local + ', value: ' + list[i_local]);
        }, 3000);
    })(arr, i);  //IIFE
}

//4. or even better, only wrap the callback function inside setTimout()
console.log('-------4--------');  // <-- not useful, immediately-invoked
for (var i = 0; i < arr.length; i++) {
    setTimeout((function(i_local) { 
      return function() { 
          console.log('(4) Index: ' + i_local);
        } 
    })(i), 1000 + i);   // <-- note 1001 ms, 1002, 1003, 1004
  }
  
  console.log('-------4.5--------');  
  for (var i = 0; i < arr.length; i++) {
      setTimeout(function(i_local) {   // <-- wrapping parentheses is not needed
        return function() { 
            console.log('(4.5) Index: ' + i_local);
          } 
      }(i), 1000 + i);   
    }

//5. the extended arguments to setTimeout()
console.log('-------5--------');  // <-- not useful, immediately-invoked
for (var i = 0; i < arr.length; i++) {
    setTimeout(function(arr, i) {
        console.log('(5) Index: ' + i + ', value: ' + arr[i]);
    }, 3000, arr, i); // <-- add as arguments to setInterval
}

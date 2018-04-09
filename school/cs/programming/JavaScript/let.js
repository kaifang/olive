//ES6 introduces Let variables which comes up with block level scoping.

//There is another great advantage using let as it creates a new lexical environment and also binds fresh value rather than keeping an old reference.
//The first for loop always print the last value, with let it creates a new scope and bind fresh values printing us 1, 2, 3, 4, 5.

//let is only visible in the for() loop and var is visible to the whole function.

for(var i=1; i<6; i++){
   setTimeout(function(){
      console.log(i);  //always 6!
   },100)
}

for(let i=1; i<6; i++){
   setTimeout(function(){
      console.log(i);
   },100)
}

/* Note: ??
Quoting ECMAScript 6 (ECMAScript 2015) specification's, let and const declarations section,
The variables are created when their containing Lexical Environment is instantiated but may not be accessed in any way until the variable’s LexicalBinding is evaluated.

All declarations (var, let, const, function, function*, class) are "hoisted" in JavaScript.
The difference between var/function/function* declarations and let/const/class declara­tions is the initialisation.

The former are initialised with undefined or the (generator) function right when the binding is created at the top of the scope. 
The lexically declared variables however stay uninitialised. This means that a ReferenceError exception is thrown when you try to access it. 
It will only get initialised when the let/const/class statement is evaluated, everything before (above) that is called the temporal dead zone.

The temporal dead zone is not a syntactic location, but rather the time between the variable (scope) creation and the initialisation. 
It's not an error to reference the variable in code above the declaration as long as that code is not executed
*/

/* Update:
In ECMAScript 2015, let bindings are not subject to Variable Hoisting, 
which means that let declarations do not move to the top of the current execution context. 
Referencing the variable in the block before the initialization results in a ReferenceError 
(contrary to a variable declared with var, which will just have the undefined value). 

The variable is in a "temporal dead zone" from the start of the block until the initialization is processed.
*/

function do_something() {
    console.log(bar); // undefined
    console.log(foo); // ReferenceError
    var bar = 1;
    let foo = 2;
  }

// hoisted means that if a name is declared in a scope, in that scope the identifier will always reference that particular variable.
// This is true both for function and block scopes.
  x = y = "global";
  // function scope:
  (function() {
      x; // not "global". It's undefined
      console.log(typeof x); // undefined
      //y; // Reference error: y is not defined
      //console.log(typeof y); // ReferenceError
  
      var x = "local";
      let y = "local";
  }());

// block scope (not for `var`s):
{
    //x; // not "global"
    let x;
}

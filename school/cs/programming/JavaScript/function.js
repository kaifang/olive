//JS functions are defined with the function keyword using the following 4 ways:

// 1. function declaration 
// see 4 for constructor function
function myFunction(a, b) {
    return a * b;
}

var z = myFunction(4, 3);

// 2. function expression
// The function below is actually an anonymous function (a function without a name),
// functions stored in variables do not need function names. They are always invoked (called) using the variable name.
var x = function (a, b) {return a * b};
var z2 = x(4, 3);

// 3. built-in JavaScript function constructor called Function()
var x3 = new Function("a", "b", "return a * b");
var z3 = x3(4, 3);

console.log(z, z2, z3);

// diff between 1 and 2: function name vs anonymous
console.log(myFunction.name); // prints "myFunction"
console.log(x.name); // prints "", but EC5 now prints "x"
var abc = function(){};
console.log(abc.name); // prints "", now prints "abc"
// note:  Variables and methods can infer the name of an anonymous function from its syntactic position (new in ECMAScript 2015).
// however, you may print function.name like this: 
console.log((function () {
    console.log("I am anonymous!");
}).name);  // prints "anonymous", ops, prints "" 
console.log((new Function).name);  // this one prints "anonymous"

// diff between 2 and 1: expression vs declaration
// Function expressions will execute automatically if the expression is followed by ().
// like above z2 = x(4, 3);
// Function declaration cannot be self-invoked, 
// but you can add parentheses around the function declaration to make it a function expression.
(function myFunction2() {
    console.log("Hello! I am here.");
})();

// or anonymous 
(function () {
    console.log("Hello! I am there.");
})();


/*
Functions are Objects
Bug: The typeof operator in JavaScript returns "function" for functions.
But, JavaScript functions can best be described as objects.

JavaScript functions have both properties and methods.

The arguments.length property returns the number of arguments received when the function was invoked:
*/
function theFunction(a, b) {
    return arguments.length;
}
theFunction(4, 3); //returns 2

// 4. A function can be used to create new objects, it is called an object constructor.
// The constructor function is the prototype for Person objects.
// It is considered good practice to name constructor function with an upper-case first letter.
function Person(first, last, age) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
}

var john = new Person("John", "Doe", 50) ;
var mary = new Person("Mary", "Rally", 48);

// Compare: the object literal way to create an object
var person = {
    firstName: "Kai",
    lastName : "Fang",
    fullName : function() {
       return this.firstName + " " + this.lastName;
    }
};

console.log(person.fullName());

// Note: You cannot add a new property to a prototype 
// the same way as you add a new property to an existing object, because the prototype is not an existing object.

// this is wrong
Person.nationality = "English";
var peter = new Person("Peter", "Smith", 50) ;
console.log("The nationality of Peter is " + peter.nationality);

// this is ok
Person.prototype.nationality2 = "USA";
var peter2 = new Person("Peter2", "Smith", 50) ;
console.log("The nationality of Peter2 is " + peter2.nationality2);

/* The bind() method creates a new function that, when called, 
has its this keyword set to the provided value, 
with a given sequence of arguments preceding any provided when the new function is called.

func.bind(thisArg[, arg1[, arg2[, ...]]])

thisArg
The value to be passed as the this parameter to the target function when the bound function is called. 
The value is ignored if the bound function is constructed using the new operator.
*/
var module = {
    x: 42,
    getX: function () {
        return this.x;
    }
}

var retrieveX = module.getX;
console.log(retrieveX()); // The function gets invoked at the global scope
// expected output: undefined

var boundGetX = retrieveX.bind(module);
console.log(boundGetX());
// expected output: 42

/*
By default within window.setTimeout(), 
the this keyword will be set to the window (or global) object. 
When working with class methods that require this to refer to class instances, 
you may explicitly bind this to the callback function
*/
function LateBloomer() {
    this.petalCount = Math.floor(Math.random() * 12) + 1;
}

LateBloomer.prototype.declare = function () {
    console.log('I am a beautiful flower with ' +
        this.petalCount + ' petals!');
};

// Declare bloom after a delay of 1 second
LateBloomer.prototype.bloom = function () {
    //window.setTimeout(this.declare.bind(this), 1000);
    setTimeout(this.declare.bind(this), 1000);
};

var flower = new LateBloomer();
flower.bloom();
  // after 1 second, triggers the 'declare' method
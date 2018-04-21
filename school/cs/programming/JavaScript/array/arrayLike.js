//Array-Like Objects: "NodeList", "arguments"
//have a length property and properties with numeric names.

//A NodeList isn’t an Array 
var nodes = document.getElementsByTagName('div'); 
console.log(nodes); // outputs 3

//Similarly, the arguments object in JavaScript is not actually an array object.
console.log(typeof arguments); // 'object'
console.log(typeof arguments[0]); //this will return the typeof individual arguments.

function talk(greet, farewell, name, name2, name3)
//function talk(greet, farewell, ...names)
{
    console.log(typeof arguments);
    console.log(arguments);
    //{ '0': 'hello', '1': 'goodbye', '2': 'you', '3': 'me', '4': 'her' }
    const args_skip2 = Array.prototype.slice.call(arguments, 2);
    console.log(args_skip2);
    //[ 'you', 'me', 'her' ]
}
talk('hello', 'goodbye', 'you', 'me', 'her');

//Convert an array-like object into a true array
//1 loop
var myNodeList = document.querySelectorAll('div');  //returns a static NodeList, not live
var myArray = []; // empty Array
for (var i = 0; i < myNodeList.length; i++) {
    var self = myNodeList[i];
    myArray.push(self);
}
// for performance, unshift() method adds one or more elements to the beginning of an array
for (var i = myNodeList.length; i--; myArray.unshift(divs[i]));

function sortArgs() {
    var args = [];
    for (var i = 0; i < arguments.length; i++)
        args[i] = arguments[i];
    return args.sort();
}

//2 slice
var trueArray = Array.prototype.slice.call(arrayLikeObject);
var divs = Array.prototype.slice.call(document.querySelectorAll("div"));

//slice works on anything that has a length property, which arguments conveniently does.
function sortArgs2() {
    var args = Array.prototype.slice.call(arguments);
    var args_skip2 = Array.prototype.slice.call(arguments, 2);

    return args.sort();
}

//If Array.prototype.slice is too much of a mouthful, you can abbreviate it slightly by 
//using array literals:
var args = [].slice.call(arguments);

//3 spread
var trueArray = [...iterableObject];
var divs = [...document.querySelectorAll("div")];

function sortArgs3(...args) {
    return args.sort(function (a, b) { return a - b; });
}
sortArgs3(12, 4, 6, 8).toString();

//4 ES6, Array.from
var divs = Array.from(document.querySelectorAll('div'));

function sortArgs4() {
    return Array.from(arguments).sort(function (a, b) { return a - b; });
  }

/*-----arrow function does not have the arguments -------
function foo(x) {
   console.log(arguments)
} //foo(1) prints [1]

const bar = x => console.log(arguments) 
gives the following error:
Uncaught ReferenceError: arguments is not defined

since the arguments array-like object was a workaround to begin with, which ES6 has solved with a rest parameter:

const bar = (...arguments) => console.log(arguments);
arguments is by no means reserved here but just chosen. You can call it whatever.
const test = (one, two, ...rest) => [one, two, rest];
rest parameter must be last formal parameter.

rest arguments obviate the need for the arguments object. 
With rest arguments, you can have an actual array anytime you actually want it. bit there's no language overhead

const myFunc = (...args) => console.log ("arguments", args)
myFunc (1, 2, 3)
// arguments [1, 2, 3]

---------------------------------------*/

//loop through all the entries in an array

/*
1) a simple old-fashioned for loop  (always available cross browsers, without shimming/polyfilling)
2) Array#forEach (spec | MDN) (or its relatives some, map, etc, will skip sparse values)
3) a for-of loop (ES2015+ only)
4) for-in with safeguards (Don't use it unless with safeguards, since it will also loop thru any enumerable properties in the parent, that is, the prototype chain.)
*/

//Array-Like Objects: "NodeList", "arguments"
//have a length property and properties with numeric names.

//A NodeList isn’t an Array 
var nodes = document.getElementsByTagName('div'); //returns a live record
console.log(nodes); // outputs 3

//loop through using any of the options above for arrays.
//first, convert an array-like object into a true array
var myNodeList = document.querySelectorAll('div');  //returns a static NodeList, not live
var myArray = []; // empty Array
for (var i = 0; i < myNodeList.length; i++) {
    var self = myNodeList[i];
    myArray.push(self);
}
// for performance, unshift() method adds one or more elements to the beginning of an array
for (var i = myNodeList.length; i--; myArray.unshift(divs[i]));

//or slice
var trueArray = Array.prototype.slice.call(arrayLikeObject);
var divs = Array.prototype.slice.call(document.querySelectorAll("div"));

// or spread
var trueArray = [...iterableObject];
var divs = [...document.querySelectorAll("div")];

// ES6, Array.from
var divs = Array.from(document.querySelectorAll('div'));

//1
var index, len;
var a = ["a", "b", "c"];
for (index = 0, len = a.length; index < len; ++index) {
    console.log(a[index]);
}

let a2 = ["a", "b", "c"];
for (let index2 = 0; index2 < a2.length; ++index2) {
    let value = a[index2];
}
//console.log(index2); // Would cause "ReferenceError: index is not defined"
//console.log(value); // Would cause "ReferenceError: value is not defined"

//not just value but also index is recreated for each loop 
let divs = document.querySelectorAll("div");
for (let index = 0; index < divs.length; ++index) {
    divs[index].addEventListener('click', e => {
        alert("Index is: " + index);
    });
}


//2
//forEach accepts an iterator function
//The iterator function is called for each entry in the array, in order, 
//skipping non-existent entries in sparse arrays.
//benefit: you don't have to declare indexing and value variables in the containing scope
var a = ["a", "b", "c"];
a.forEach(function(entry) {
    console.log(entry);
});

/*
ES5 defined several other useful functions, including:
every (stops looping the first time the iterator returns false or something falsey)
some (stops looping the first time the iterator returns true or something truthy)
filter (creates a new array including elements where the filter function returns true and omitting the ones where it returns false)
map (creates a new array from the values returned by the iterator function)
reduce (builds up a value by repeated calling the iterator, passing in previous values; see the spec for the details; useful for summing the contents of an array and many other things)
reduceRight (like reduce, but works in descending rather than ascending order)
*/

//3
//it uses an iterator defined by the object (the array), 
//and arrays define that their iterators iterate through their entries (not their properties).
//the order in which the entries are visited is the numeric order of their indexes.
var val;
var a = ["a", "b", "c"];
for (val of a) {  //use an iterator implicitly
    console.log(val);
}

var it = a.values(); //Use an iterator explicitly
var entry;
while (!(entry = it.next()).done) { 
    console.log(entry.value);
}
//The iterator is a function (specifically, a generator) that returns a new object each time you call next.

//4
//for-in loops through the enumerable properties of an object, not the indexes of an array. 
//safe guard in case additional properties are defined as enumerable.
//Note, the order is not guaranteed.

var key;
var a = []; // `a` is a sparse array
a[0] = "a";
a[10] = "b";
a[10000] = "c";
for (key in a) {
    if (a.hasOwnProperty(key)  &&        // the object has its own property by that name (not one it inherits from its prototype)
        /^0$|^[1-9]\d*$/.test(key) &&    // the key is a base-10 numeric string in its normal string form
        key <= 4294967294                // its value is <= 2^32 - 2 
                                         // an array's length fits in a 32-bit unsigned integer.
        ) {
        console.log(a[key]);
    }
}
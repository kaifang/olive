// Case 1: 0 is a ‘falsy’ value
let someString = 'findthisbug';
if(someString.indexOf('findthis')) {
    console.log('it contains the word!');
}
else {
    console.log('it does not contains the word???');
}
/* 
it returns the index, which is the position inside someString where the substring ‘findthis’ starts. 
The problem with this code is the fact that the someString string could very well start with ‘findthis’ 
which would mean that the indexOf check would return a 0 (the position for the very first character in 
the string). And because 0 is a ‘falsy’ value – meaning that it is treated as a boolean false. 
*/

// Case 2:  wrapper object is temporary, created then thrown away.
someString = "Hello world!";
//the letter variable will hold a "H":
const letter = someString.charAt(0);
/* In Javascript, Strings are not actually objects. 
what’s actually happening is that a wrapper object is being created.
as soon as we make the call to charAt – in effect, what looks like a method access of 
a String object named someString – then Javascript will actually convert the string value to an object.
*/
console.log('letter is', letter);

someString.size = 10;
// s will be undefined:
var s = someString.size;
console.log('s is', s);
/*
create a temporary wrapper String object and set a property named “size” on the someString string. 
The object, however, is then thrown away. So, when we try to access the size property in the next line, 
the variable “s” will actually be undefined, because that property does not exist since 
the String object created was only temporary. 
Therefore, setting the value of a property on a string won’t work, because it’s just set on temporary wrapper object.
*/
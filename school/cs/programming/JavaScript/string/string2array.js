//convert a string into an  array
var string = "0,1,2";
var objectString = '{Name:"Tshirt", Group:"Clothes", Gender:"male"}, {Name:"Dress", Group:"Clothes", Gender:"female"}, {Name:"Belt", Group:"Leather", Gender:"child"}';
var jsonString = '{ "name":"John", "birth":"1986-12-14", "city":"New York"}';

var array = [string];
console.log(array); //[ '0,1,2' ]
console.log(array[0]);  // 0,1,2
//but we want 0
console.log('-------');

//1
// be aware that JSON.parse will limit you to the supported data types
console.log('JSON.parse');
//var p =JSON.parse(array);  //ops, error, cannot parse array, only parse a string
var arr = JSON.parse("[" + string + "]");  // an Array of numbers
console.log(arr);  // [0, 1, 2]

/*
JSON.parse() parse the JSON format string into 

(1) a JavaScript object
{
    "name":"John",
    "age":31,
    "pets":[
        { "animal":"dog", "name":"Fido" },
        { "animal":"cat", "name":"Felix" }
    ]
}
var myObj = JSON.parse(this.responseText);
myObj.name;

(2) Be aware that, if the string is a JSON derived from an array, 
the method will return a JavaScript array, instead of a JavaScript object.

[ "Ford", "BMW", "Audi", "Fiat" ]
var myArr = JSON.parse(this.responseText);
myArr[0];
*/

console.log('-------');

//2
//split() will end up with an Array of strings
var arr_string = string.split(",");
console.log(arr_string); //[ '0', '1', '2' ]

var arr_num = string.split(",").map(Number);
/*
var arr_num = string.split(',').map(function(n) {
    return Number(n);
});
*/
console.log(arr_num); //[ 0, 1, 2 ]

//3 ES6
var arr_es6 = Array.from('string');
console.log(arr_es6); //[ 's', 't', 'r', 'i', 'n', 'g' ]

console.log(Array.from(string)); //ops! [ '0', ',', '1', ',', '2']
console.log(Array.from(string.replace(',', ''))); // ops again! [ '0', '1', ',', '2']
console.log(Array.from(string.replace(/,/g, ''))); //[ '0', '1', '2' ]
//replace(new RegExp(search, 'g'), replacement);

//4 Spread
var stringToConvert = "012";
var convertedArray  = [...stringToConvert];
console.log('ES6 spread:');
console.log(convertedArray); //[ '0', '1', '2' ]

//note: Spread on a string is one char at a time
var stranger = "0,1,2";
var strangerArray  = [...stranger];
console.log('ES6 spread for string, ops! one char at a time!!!');
console.log(strangerArray); //ops! [ '0', ',', '1', ',', '2' ]

// Note: Spread on an array is different, below is an example to copy an array
var arr = [1, 2, 3];
var arr2 = [...arr]; // like arr.slice()
arr2.push(4); 

// arr2 becomes [1, 2, 3, 4]
// arr remains unaffected
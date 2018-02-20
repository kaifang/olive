//convert a string into an  array
var string = "0,1,2";
var objectString = '{Name:"Tshirt", Group:"Clothes", Gender:"male"}, {Name:"Dress", Group:"Clothes", Gender:"female"}, {Name:"Belt", Group:"Leather", Gender:"child"}';
var objectString2 = '{ "name":"John", "birth":"1986-12-14", "city":"New York"}';

var array = [string];
console.log(array); //[ '0,1,2' ]
console.log(array[0]);  // 0,1,2
//but we want 0
console.log('-------');

//1
// be aware that JSON.parse will limit you to the supported data types
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
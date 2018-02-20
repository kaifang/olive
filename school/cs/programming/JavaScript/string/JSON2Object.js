// This is a JSON String.
var foo = '{ "prop": "val" }';

// This is an Object literal.
var bar = { "prop": "val" };


// This is a JSON String, like what you'd get back from an AJAX request.
var my_json_string = '{ "prop": "val" }';
 
// deserialize JSON String into an Object.
var my_obj = JSON.parse( my_json_string );
//alert( my_obj.prop == 'val' ); //  true

//serialize an Object into a JSON String.
var other_json_string = JSON.stringify( my_obj );

/*
(1) JSON has a very strict syntax, and while { "prop": "val" } is valid JSON when used in a string context, 
{ prop: "val" } and { 'prop': 'val' } are not valid JSON. 
All property names and string values must be surrounded by double quotes, not single quotes! 
*/

/*
(2) An object literal is a list of zero or more pairs of property names and associated values of an object, 
enclosed in curly braces ({}).
Is the key/property name valid both with/without quotes? 
The only time you need to enclose a key in quotes when using Object Literal notation is where the key 
contains a special character (if, :, - etc).
a = { "!": 1234 } // Valid
a = { !: 1234 } //  Syntax error

But JSON must be enclosed in double quotes.
*/
var tmp_obj = {
    color: "red",
    numberOfDrawers: 4
};

var tmp_json = {"color":"red","numberOfDrawers":4};

/*
(3) JSON cannot represent functions or dates. 
If you attempt to stringify an object with a function member, the function will be omitted from the JSON representation. 
A date will be converted to a string.
*/
JSON.stringify({
    foo: new Date(),
    blah: function () { 
        alert('hello');
    }
}); 
// returns the string "{"foo":"2001-01-23T10:21:33.939Z"}"

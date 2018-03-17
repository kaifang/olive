//Regular expressions are used with the RegExp methods test and exec 
//and with the String methods match, replace, search, and split.

//You construct a regular expression in one of two ways:
// 1. iteral, better performance
// 
var re = /ab+c/;

// 2. constructor function, use this runtime when the pattern will be changing
// new RegExp('pattern', 'flags');
var re2 = new RegExp('ab+c');

// Examples:
var myArray = /Chapter (\d+)\.\d*/.exec("Open Chapter 4.3, paragraph 6"); //'4' is remembered
console.log(myArray);
var myArray2 = /Chapter (\d+)\.\d*/.exec("Chapter 3 and 4"); //pattern is not found, because it does not have a period
console.log(myArray2);

var re3 = /(\w+)\s(\w+)/;
var name = 'FirstName LastName';
var new_name = name.replace(re3, '$2, $1');
console.log(new_name);

// flags: looks for one or more characters followed by a space, and looks for this combination throughout the string
var re = /\w+\s/g;
var str = 'One two three four';
var tokens = str.match(re);
console.log(tokens);  // ["One ", "two ", "three "]

// Common 
const regExpList = {
    integer: /^\d+$/,
    passwordLength: /^.{8,30}$/,
    zipCode: /(^\d{9}$)|(^\d{5}$)|(^\d{5}-\d{4}$)/,
    //phone: /^\d{10}$/,
    phone: /(?:\d{3}|\(\d{3}\))([-\/\.])\d{3}\1\d{4}/,
    // 1. (?:\d{3}|\(\d{3}\))
    // Within non-capturing parentheses (?: , the regular expression looks for three numeric characters \d{3}
    // Or
    // a left parenthesis \( followed by three digits \d{3}, followed by a close parenthesis \)
    // 2. ([-\/\.])
    // followed by one dash, forward slash, or decimal point and when found, remember the character 
    // 3. \d{3}
    // followed by three digits
    // 4. \1\d{4}
    // followed by the remembered match of a dash, forward slash, or decimal point \1, followed by four digits \d{4}

    //eg - kai2017@gmail.com
    email: /^([!#-'*+\-/-9=?A-Z^-~]+[.])*[!#-'*+\-/-9=?A-Z^-~]+@(((?:(?:[\da-zA-Z](?:[-\da-zA-Z]{0,61}[\da-zA-Z])?)\.)+(?:[a-zA-Z](?:[-\da-zA-Z]{0,6}[\da-zA-Z])?))|(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])|(0[xX]0*[\da-fA-F]?[\da-fA-F]\.){3}0[xX]0*[\da-fA-F]?[\da-fA-F]|(0+[0-3][0-7][0-7]\.){3}0+[0-3][0-7][0-7]|(0|[1-9]\d{0,8}|[1-3]\d{9}|4[01]\d{8}|42[0-8]\d{7}|429[0-3]\d{6}|4294[0-8]\d{5}|42949[0-5]\d{4}|429496[0-6]\d{3}|4294967[01]\d{2}|42949672[0-8]\d|429496729[0-5])|0[xX]0*[\da-fA-F]{1,8}|([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}|([\da-fA-F]{1,4}:){6}((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])))$/i,

    //ignores the preceding http:// or https://
    domain: /^(?:http:\/\/|https:\/\/)([^/]+)/,

    //9 digits in length, Not all numbers same, Not Sequential (012345678,123456789)
    ssn: /^(?=(\d)(?!\1+$)\d)(?=(?!012345678)(?!123456789)(^[\d]{9}$)).*$/
}

//The expected format is like ###-###-####
const Ok = regExpList.phone.exec("123-456-7890");
if (!Ok)
    console.log("invalid phone number!");
else
    console.log(Ok);

const Ok2 = regExpList.phone.exec("(123)-456.7890");
if (!Ok2)
    console.log("invalid phone number!");
else
    console.log(Ok2);

//export default regExpUtil;
//replacing any number divisible by three with the word "fizz", and any number divisible by five with the word "buzz".

// 1
for (let i = 0; i < 1e2;) {
    console.log((++i % 3 ? "" : "Fizz") + (i % 5 ? "" : "Buzz") || i);
}

console.log('------------------------');
// 2
for (let i = 1; i < 11; i++) {
    if (i % 15 == 0) console.log("FizzBuzz");
    else if (i % 3 == 0) console.log("Fizz");
    else if (i % 5 == 0) console.log("Buzz");
    else console.log(i);
}

console.log('------------------------');
// 3
/* Takes in a object of divisors of the form
   divisors = {
       name: value,
   };
   and an integer. Loops through the list if number below or equal
   maxNumber. If a number is divisible by one of the values, print the name.
  */
function fizzBuzz_bad(divisors = {
    fizz: 3,
    buzz: 5
}, maxNumber = 10) {

    for (var num = 1; num <= maxNumber; num++) {
        var str = "";
        var str2 = "";

        //ES5
        // Loops through the keys of the divisors
        Object.keys(divisors).forEach(function (key) {
            // Ternary expression, if divisible append key else do nothing
            str += num % divisors[key] == 0 ? key : '';
        });

        //ES8 Object.entries
        for (let [key, value] of Object.entries(divisors)) {
            str2 += num % value == 0 ? key : '';
        }

        // If anything got appended print string else num
        console.log(str ? str : num);
        console.log('ES8:');
        console.log(str ? str : num);

    }
}

fizzBuzz_bad();

/* pitfalls: 
1. What if I wanted every 7 number to also add fizz, so 105 would be fizzbuzzfizz? 
You can't do that in your code, since you are using the string as the (unique) key
2. While it will work in most cases,the order of properties in an object is not guaranteed. 
I would change this to either use an array of object or a map
*/
const divisors_bad = {
    fizz: 3,
    buzz: 5
}

const divisors_good = new Map([[3,'fizz'],[5,'buzz']]);

console.log('------------------------');
// 4
//ES6 introduces a new data structure, called Map.
//as an alternative to using Object literals for storing key/value pairs.
// drawback of using object literals:
// (1) may have keys that clobber Object prototype methods
// (2) all keys can only be strings. (when attempting to use a primitive value as a string, 
//     the system will convert it to a string behind the scenes.)
// (3) property/key orders are not guaranteed
// (4) Objects also lacks a forEach method
function fizzBuzz(divisors = new Map([[3,'fizz'],[5,'buzz']]), maxNumber = 10) {
    for (var num = 1; num <= maxNumber; num++) {
      console.log(fizzValue(divisors, num));
    }
  }
  
  function fizzValue(divisors, num) {
    var str = "";
    divisors.forEach((value, key) => {
        str += num % key == 0 ? value : '';
    });
    return (str ? str : num);
  }
  
  fizzBuzz();

console.log('------------------------');
/*
*/
var num = 5;
var base10 = num.toString();
var base2 = num.toString(2);
console.log('base10', base10);
console.log('base2', base2);

/*

// add further requirement:
//if it contains multiple 3s or 5s, just print one "Bizz" or "Fuzz".

public class Test
{
    public static void main(String... args)
    {
        int num = 101;
        for (int i = 1; i < num; i++)
        {
            StringBuilder sb = new StringBuilder();
            if(i % 3 == 0) sb.append("Fizz");
            if(i % 5 == 0) sb.append("Buzz");

            if(Integer.toString(i).indexOf("3") != -1) sb.append("Bizz");
            if(Integer.toString(i).indexOf("5") != -1) sb.append("Fuzz");

            if (sb.length() == 0) 
                System.out.print(i);
            else 
                System.out.print(sb);
            System.out.println();
        }
    }
}
*/
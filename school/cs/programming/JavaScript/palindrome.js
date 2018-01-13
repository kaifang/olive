const name = 'Hannah';
const name2 = 'A student is a student';
const name3 = 'Amore, Roma';
const name4 = 'A man, a plan, a canal. Panama';

//Using Built-In Functions
function palindrome(str) {
  console.log(str);

  // Lowercase the string and use the RegExp to remove unwanted characters 
  const re = /[\W_]/g; // equivalent to [^A-Za-z0–9_], matches any non-word character
  //const lowRegStr = str.toLowerCase().replace(re, '');
  //console.log('str is changed:');
  //console.log(str);

  let lowRegStr = str.toLowerCase().replace(re, '');
  console.log('Note: str is NOT changed:');
  console.log(str);
  console.log('lowRegStr is changed:');
  console.log(lowRegStr);

  // Use the chaining methods with built-in functions
  const reverseStr = lowRegStr.split('').reverse().join('');
  // lowRegStr.split('') = "amanapl".split('') = ["a", "m", "a", "n", "a", "p", "l"]

  // Check if reverseStr is strictly equals to
  return reverseStr === lowRegStr;
}
console.log(palindrome(name));
console.log(palindrome(name2));
console.log(palindrome(name3));
console.log(palindrome(name4));

console.log('--------------');

//Using a FOR loop
function palindrome2(str) {
  console.log(str);

  const re = /[^A-Za-z0-9]/g;
  //bug:
  //str.toLowerCase().replace(re, '');

  //fix:
  str = str.toLowerCase().replace(re, '');

  const len = str.length;
  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - 1 - i]) {
      return false;
    }
  }
  return true;
}
console.log(palindrome2(name));
console.log(palindrome2(name2));
console.log(palindrome2(name3));
console.log(palindrome2(name4));

console.log('--------------');

//Using recursion
function palindrome3(str) {
  console.log(str);

  const re = /[^A-Za-z0-9]/g;
  str = str.toLowerCase().replace(re, '');
  const len = str.length;

  if (len < 2) {
    return true;
  }

  // len >= 2
  if (str[0] != str[len - 1]) {
    return false;
  }

  return palindrome3(str.slice(1, len - 1));
  //note: slice(star,end), end parameter is up to, but not including
  // or substr(1, len - 2)

}
console.log(palindrome3(name));
console.log('-----');
console.log(palindrome3(name2));
console.log('-----');
console.log(palindrome3(name3));
console.log('-----');
console.log(palindrome3(name4));
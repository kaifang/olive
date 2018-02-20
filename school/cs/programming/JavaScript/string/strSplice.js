// The Javascript splice only works with arrays.

// Method1, use slice()
function spliceSlice(str, index, count, add) {
    // We cannot pass negative indexes directly to the 2nd slicing operation.
    if (index < 0) {
        index = str.length + index;
        if (index < 0) {
            index = 0;
        }
    }

    return str.slice(0, index) + (add || "") + str.slice(index + count);
}

// or add this globally.
//keep in mind it doesn't work exactly the same as the array splice method because strings are immutable,
// while array splice changes on the original array.
// If you do not want to change the original array, use array filter
String.prototype.splice_1 = function (index, count, add) { 
    return this.slice(0, index) + (add || "") + this.slice(index + count); 
}

// Method2, use split() to array, then join()
function spliceSplit(str, index, count, add) {
    var ar = str.split('');
    ar.splice(index, count, add);
    return ar.join('');
}



// Method3, use substring()
String.prototype.splice = function (startIndex, length, insertString) {
    return this.substring(0, startIndex) + insertString + this.substring(startIndex + length);
};

const creditCardNumber = "5500000000000004";
const cardSuffix = creditCardNumber.splice(1, 12, '****');
console.log(cardSuffix);  // output: 5****0004

/*
String.slice was added so that there is a string method consistent to Array.slice. substring has been there forever.

What they have in common:

If start equals stop: returns an empty string
If stop is omitted: extracts characters to the end of the string
If either argument is greater than the string's length, the string's length will be used instead.

Distinctions of substring():

If start > stop, then substring will swap those 2 arguments.
If either argument is negative or is NaN, it is treated as if it were 0.

Distinctions of slice():

If start > stop, slice() will NOT swap the 2 arguments.
If start is negative: sets char from the end of string, exactly like substr() in Firefox. This behavior is observed in both Firefox and IE.
If stop is negative: sets stop to: string.length – Math.abs(stop) (original value).
*/

/*
Be careful when you use delete for an array. It is good for deleting attributes of objects but not so good for arrays. It is better to use splice for arrays.

Keep in mind that when you use delete for an array you could get wrong results for anArray.length. In other words, delete would remove the element but wouldn't update the value of length property.

You can also expect to have holes in index numbers after using delete, e.g. you could end up with having indexes 1,3,4,8,9,11 and length as it was before using delete. In that case, all indexed for loops would crash, since indexes are no longer sequential.

If you are forced to use delete for some reason, then you should use for each loops when you need to loop through arrays. As the matter of fact, always avoid using indexed for loops, if possible. 
*/
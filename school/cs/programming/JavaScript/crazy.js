// Can (a ==1 && a== 2 && a==3) ever evaluate to true?

// yes!
//(1)  take advantage of the operator ==, create an object with a custom toString (or valueOf) function
const a = {
    i: 1,
    toString: function () { return a.i++; }
}

if (a == 1 && a == 2 && a == 3) {
    console.log('it is 1 and 2 and 3!');
}

if (a == 1 && a == 2 && a == 3) {
    console.log('should not be here again!');
}

// (2)
function A(value) {
    value = value || 0;
    this.valueOf = function () { return ++value; };
}

const a2 = new A;

if (a2 == 1 && a2 == 2 && a2 == 3) {
    console.log('another bingo!');
}
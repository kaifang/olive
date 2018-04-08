var sum = [0, 1, 2, 3].reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
}, 0);
// sum is 6

//alternatively use arrow function, one line ,no return
var total = [0, 1, 2, 3].reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    10
);
// sum is 6

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const array1 = [1, 2, 3, 4];
// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15

//Flatten an array of arrays
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
    (accumulator, currentValue) => accumulator.concat(currentValue),
    []
);
// flattened is [0, 1, 2, 3, 4, 5]

//If the array is empty and no initialValue is provided, TypeError will be thrown.
var maxCallback = ( acc, cur ) => Math.max( acc.x, cur.x );

// reduce() without initialValue
[ { x: 22 }, { x: 42 } ].reduce( maxCallback ); // 42
[ { x: 22 }            ].reduce( maxCallback ); // { x: 22 }
[                      ].reduce( maxCallback ); // TypeError

//It is usually safer to provide an initial value
// map/reduce; better solution, also works for empty or larger arrays
var maxCallback2 = ( max, cur ) => Math.max( max, cur );
[ { x: 22 }, { x: 42 } ].map( el => el.x )
                        .reduce( maxCallback2, -Infinity );

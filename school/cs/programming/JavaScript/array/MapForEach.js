### Array.prototype.forEach() and Array.prototype.map()

* forEach() — executes a provided function once for each array element.
* map() — creates a new array with the results of calling a provided function on every element in the calling array.

what’s the difference?
forEach() method doesn’t actually return anything (undefined). 
It simply calls a provided function on each element in your array. 
This callback is allowed to mutate the calling array.

The difference is that map() utilizes return values and actually returns a new Array of the same size.


```
let arr = [1, 2, 3, 4, 5];

//Note that you would never return from a forEach function as the return values are simply discarded:
arr.forEach((num, index) => {
    return arr[index] = num * 2; //don't do this
});
// result: arr = [2, 4, 6, 8, 10]


let doubled = arr.map(num => {
    return num * 2;
});
// result: doubled = [2, 4, 6, 8, 10]

```

use forEach to push something to another array:
```
const newArray = [];
const arr = getData();

arr.forEach(item => {
      const id = arr.getAttribute();
      const group = arr.getType();
      newArray.push({
                group,
                id
            });
});

return newArray;
```

use map in react to return components:

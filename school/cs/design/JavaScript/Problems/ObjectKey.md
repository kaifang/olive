### difference between object keys (property names) with quotes and without quotes?

Is there any difference between
```
obj = {'foo':'bar'} 
```
and
```
obj = {foo: 'bar'}
```
No, the quotes do not make a difference. unless, 

1. the key is not a valid JavaScript identifier. For example:'super' or 'class' as a key since those are reserved keywords.

2. the key is numeric literal. For example:
```
 obj = { 12e34: true }; 
 is not the same as 
 obj = { '12e34': true };. 
 
 The former would require you to access the property through obj['1.2e+35'], while for the latter you’d use obj['12e34'].
 
 The former you can’t use dot notation, you’ll have to use bracket notation:
 
 object['1.2e+35'] = false;
 
```

##### Note: JSON data format does require double quotes around identifiers.

##### Note: The keys of an Object are Strings and Symbols, whereas they can be any value for a Map, including functions, objects, and any primitive.

drawback of using object literals is all keys can only be strings. This works in many situations, but when attempting to use a primitive value as a string, the system will convert it to a string behind the scenes. This kind of magic which happens under the hood and without notification to the user can cause unexpected results, for instance, if the provided key is an array.
```
obj[[1,2,3]] = "value4" // the provided key is an array
obj['1,2,3'] = "value4" // the system has made the key a string
```

Another example
```
obj = { 12e34: true }; 
obj['1.2e+35']  // the system has made it to a string
```


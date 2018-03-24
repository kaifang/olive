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

Note: JSON data format does require double quotes around identifiers.

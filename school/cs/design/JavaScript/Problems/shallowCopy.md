### shallow copy, Warning for Deep Clone
Object.assign is only one level deep. Because Object.assign() copies property values. 
If the source value is a reference to an object, it only copies that reference value.
```
var a = {name: 'John', things: [0,1,2]}
var b = Object.assign({}, a, {name: 'Kay'})
b.things.push(3).  //this will change a.things too!
```

For deep cloning, we need to use other alternatives, like `concat`
```
b.things = a.things.concat(3)   //this will not chane a
```

or use ES6 `spread`
```
var a = [0,1,2]; 
var b = [...a]; 
b.push(3); 
b // [0,1,2,3] 
a // [0,1,2]
```

or use `JSON.stringify`
```
 // Deep Clone
  obj1 = { a: 0 , b: { c: 0}};
  let obj3 = JSON.parse(JSON.stringify(obj1));
  obj1.a = 4;
  obj1.b.c = 4;
  console.log(JSON.stringify(obj3)); // { a: 0, b: { c: 0}}
```

### Object.assign() 
The Object.assign() method only copies the values of all enumerable own properties from one or more source objects to a target object. 
It will return the target object.
Properties in the target object will be overwritten by properties in the sources if they have the same key.

Properties on the prototype chain and non-enumerable properties cannot be copied
```
var obj = Object.create(
  { foo: 1 },  // foo is on obj's prototype chain.
  { 
      bar: {
       value: 2  // bar is a non-enumerable property.
      },
      baz: {
        value: 3,
        enumerable: true  // baz is an own enumerable property.
      }
   }
);

var copy = Object.assign({}, obj);
console.log(copy); // { baz: 3 }
```

### Benefits of using `Object.create` for inheritance

A "class" in JavaScript has two parts:

+ The constructor function. This function contains all the logic to create an instance of the "class", i.e. instance specific code.
+ The prototype object. This is the object the instance inherits from. It contains all methods (and other properties) that should be shared among all instances.

##### bug 1. shared prototype problem
```
var Animal = {
    traits: {},
}
var lion = Object.create(Animal);
lion.traits.legs = 4;
var bird = Object.create(Animal);
bird.traits.legs = 2;
alert(lion.traits.legs) // shows 2!!!
```

using new the prototypal inheritance is explicit
```
function Animal() {
    this.traits = {};
}

function Lion() { }
Lion.prototype = new Animal();
function Bird() { }
Bird.prototype = new Animal();

var lion = new Lion();
lion.traits.legs = 4;
var bird = new Bird();
bird.traits.legs = 2;
alert(lion.traits.legs) // now shows 4
```

hence, you will often see this:
```
Dog.prototype = new Animal();
```

##### bug 2. one specific instance  
But it implies that every dog inherits from one specific Animal instance. 
That seems to be a bit strange. Shouldn't instance specific code only be run in the constructor function? 
Suddenly instance specific code and prototype methods seem to be mixed.

We don't actually want to run Animal instance specific code at that moment, 
we only want all the methods from the Animal prototype object. 
That is what Object.create lets us do:

```
Dog.prototype = Object.create(Animal.prototype);
```
Here we are not creating a new Animal instance, we only get the prototype methods. 
The instance specific code is executed exactly where it should be, inside the constructor:
```
function Dog() { 
   Animal.call(this, 'Dog'); 
}
```


##### bug 3. constructor with parameter won't work
Imagine if the constructor expects any arguments:
```
function Animal(name) { 
    this.name = name.toLowerCase();
}
```
What will you pass when you do Dog.prototype = new Animal(??);? 
It doesn't actually matter which string you pass, as long as pass something, which hopefully shows you that this is bad design.

##### bug 4. Dog.prototype = Animal.prototype, still no good

```
Dog.prototype.bark = function() {
    alert('bark');
};
```
Since Dog.prototype === Animal.prototype, all Animal instances have a method bark now, which is certainly not what you want.

### Inheritance in ES6

ES6 introduces a new syntax to create constructor functions and prototype methods, which looks like this:
```
class Dog extends Animal {

  bark() {
    alert('bark');
  }

}
```
Note, `extends` uses an internal equivalent to `Object.create` to setup inheritance.
Which means that using `Object.create(SuperClass.prototype)`

### Why using “Object.create” instead of “new”

Sometimes you cannot create an object with NEW but are still able to invoke the CREATE method.

For example: if you want to define a Custom Element it must derive from HTMLElement.
```
proto = new HTMLElement  //fail :(
proto = Object.create( HTMLElement.prototype )  //OK :)
document.registerElement( "custom-element", { prototype: proto } )
```

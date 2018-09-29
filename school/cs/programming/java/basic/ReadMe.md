### char

### char[]  //array

### int[]   //array

```
//new int[]{Integer.MAX_VALUE, 0, 1, 2, Integer.MAX_VALUE}

int[] cubes = {1, 4, 9, 16, 25, 36}; 

// iterating over an array using for loop 
System.out.println("iterating over an array using for loop in Java:"); 
for (int i = 0; i < cubes.length; i++) 
{ System.out.println(cubes[i]); } 

// iterating over an array using enhanced for loop 
System.out.println("iterating over an array using enhanced for loop in Java:"); 
for (int cube : cubes) 
{ System.out.println(cube); }

```

### String  // immutable 

```
public final class String
extends Object
implements Serializable, Comparable<String>, CharSequence
```

```
     String str = "abc";
```
is equivalent to:
```
     char data[] = {'a', 'b', 'c'};
     String str = new String(data);
```

### String[]  //array

split
```
        String str = "In@God@We@Trust"; 
        String[] arrOfStr = str.split("@", 2); 
  
        for (String a : arrOfStr) 
            System.out.println(a); 
``` 

```
        String str = "word1, word2 word3@word4?word5.word6"; 
        String[] arrOfStr = str.split("[, ?.@]+"); 
  
        for (String a : arrOfStr) 
            System.out.println(a);
```
words are separated whenever either of the characters specified in the set is encountered.
```
word1
word2
word3
word4
word5
word6
```

### List
major difference between ArrayList and Array is that, you can not store primitives in ArrayList

Array.asList()

```
int[] intArr = new int[] { 1, 2, 3 };
Arrays.asList(intArr)
Arrays.asList(new int[] { 1, 2, 3 }); //didn't compile, can't have a List of a primitive type
```
Though Autoboxing of Java 5 may give you an impression of storing primitives in ArrayList, 
it actually automatically converts primitives to Object. e.g.

```
ArrayList<Integer> integerList = new ArrayList<Integer>();
integerList.add(1); 
//here we are not storing primitive in ArrayList, instead autoboxing will convert int primitive to Integer object
```


```
Integer[] integers = new Integer[] {1,2,3};

List<Integer> list2 = Arrays.asList(1, 2, 3);  //shorter
// WARNING:
list2.add(1);     // UnsupportedOperationException
list2.remove(1);  // UnsupportedOperationException

List<Integer> list21 =  Arrays.asList(integers); // Cannot modify returned list
// WARNING:
list21.add(4);  // java.lang.UnsupportedOperationException
// it did not convert array but 'represents' it like a List. But array is under the hood with all its properties 
// like fixed number of elements

List<Integer> list22 = new ArrayList<>(Arrays.asList(integers)); // good. 
//note you need to specify type when constructing ArrayList

List<Integer> list23 = Arrays.stream(integers).collect(Collectors.toList()); //Java 8 only
```
When we use Arrays.asList the size of the returned list is fixed because the list returned is not java.util.ArrayList, 
but a private static class defined inside java.util.Arrays. 
So if we add or remove elements from the returned list, an UnsupportedOperationException will be thrown.

### Need ArrayList and not List?

```
ArrayList<Integer> list24 = Arrays.stream(integers)
                          .collect(Collectors.toCollection(ArrayList::new));
```                          

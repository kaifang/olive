### char

### char[]  //array

```
  char data[] = {'a', 'b', 'c'};
  char[] data_same = {'a', 'b', 'c'};

```

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

`for loop` vs `enhanced for loop`
```
String[] languages = {"Java", "Scala", "C++", "Ruby", "Python", "Perl"}; 

// looping over array using foreach loop 
System.out.println("Iterating over String array using Java 1.5 foreach loop"); 
for(String str : languages)
{ System.out.println(str); } 

// looping over classical for loop 
System.out.println("Looping over String array using for loop"); 
for(int i=0; i<languages.length/2; i++)
{ System.out.println(languages[i]); }

```

String to String[] array using split
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

List<Integer> list2 = Arrays.asList(1, 2, 3);  //one line

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

//now you can sort this list elements. 
Collections.sort(list22);  //ascending order
//Collections.sort(list22, Collections.reverseOrder()); 

// or sort according to user defined criteria. 
Collections.sort(myList, new Sortbyroll()); 
class Sortbyroll implements Comparator<Student> 
{ 
    public int compare(Student a, Student b) 
    { 
        return a.grade - b.grade; //ascending order
    } 
} 
        
List<Integer> list23 = Arrays.stream(integers).collect(Collectors.toList()); //Java 8 only
```
Note that Arrays.asList() return java.util.List and not ArrayList or LinkedList. 

Another worth noting point is that List returned by Arrays.asList() is a fixed length list which doesn't allow you to add or remove element from it. add() and remove() method will throw UnSupportedOperationException if you try to add or remove element from List. Some program mistook this List as read only List, which it is not because it allows set() operation which can be used to change element in List.

```
      //create and initialize List in one line
        List<String> coolStringList = Arrays.asList("Java", "Scala", "Groovy");

```
##### 1 Array to ArrayList using Using Arrays.asList()
##### 2 Array to ArrayList using Collections.addAll()

not as fast as Arrays.asList() but more flexible, since you are creating copy of original array, you can add, modify and remove any element without affecting original one.

```
String[] asset = {"equity", "stocks", "foriegn exchange", "fixed income", "futures", "options"};
List<String> assetList = new ArrayList(); 
Collections.addAll(assetList, asset);

```

##### 3 Array to ArrayList using Spring Framework CollectionUtils.arrayToList()
```
String [] currency = {"SGD", "USD", "INR", "GBP", "AUD", "SGD"}; 
System.out.println("Size of array: " + currency.length); 

List<String> currencyList = CollectionUtils.arrayToList(currency); 
//currencyList.add("JPY"); //Exception in thread "main" java.lang.UnsupportedOperationException 
//currencyList.remove("GBP");//Exception in thread "main" java.lang.UnsupportedOperationException 
System.out.println("Size of List: " + currencyList.size()); 
System.out.println(currencyList);

```


### Need ArrayList and not List?

```
ArrayList<Integer> list24 = Arrays.stream(integers)
                          .collect(Collectors.toCollection(ArrayList::new));
```                          

Creating an ArrayList
```
        //ArrayList of String
        List<String> animals = new ArrayList<>();

        // Adding new elements to the ArrayList
        animals.add("Lion");
        animals.add("Tiger");
        animals.add("Cat");
        animals.add("Dog");

        // Adding an element at a particular index in an ArrayList
        animals.add(2, "Elephant");
        
        System.out.println(animals);

```        

### convert ArrayList to Array using toArray()

```
ArrayList assetTradingList = new ArrayList(); 
assetTradingList.add("Stocks"); 
assetTradingList.add("futures and option trading"); 
assetTradingList.add("fixed income bond trading"); 

String [] assetTradingArray = new String[assetTradingList.size()]; 
assetTradingList.toArray(assetTradingArray);

```

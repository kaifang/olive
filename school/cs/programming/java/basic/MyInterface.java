/*
 * Only classes in java are inherited from java.lang.Object class. 
 * Interfaces in java don’t inherit from Object class.
 * They don’t have default parent like classes in java. 
 * However, if an interface has no direct superinterfaces, then it implicitly declare methods in Object.
 */
package basic;

/*
 * The public access specifier indicates that the interface can be used by any class in any package. 
 * If you do not specify that the interface is public, 
 * then your interface is accessible only to classes defined in the same package as the interface.
 */
public interface MyInterface {
	
	/*
	 * The interface body can contain 
	 * 1. abstract method (followed by a semicolon, but no braces.), 
	 * 2. default method (with the default modifier), 
	 * 3. static method (with the static keyword).
	 * All abstract, default, and static methods in an interface are implicitly public, 
	 * so you can omit the public modifier (and abstract modifier too)
	 */
 
	//Methods are implicitly public abstract.
	//Fields are implicitly public final static. 
	//Once again, you can omit these modifiers.
	
	   int RED = 1;
	   int GREEN = 2;
	   int BLUE = 3;
	   int BLACK = 4;
	   int WHITE = 5;
	   void foo(int color);
}


/*
 
//Usage:
 
interface Drawable extends MyInterface
{
   void draw(int color);
}

class Circle implements Drawable
{
   @Override
   public void draw(int color)
   {
      //remember that all of the methods whose headers are declared in the interface are implicitly declared public. 
      //If you forget to include public in the implemented method's declaration, the compiler will report an error 
   }
}  

class Rectangle implements Drawable
{
   @Override
   public void draw(int color)
   {
     //
   }
}

class DrawTest
{
   public static void main(String[] args)
   {
      Drawable[] drawables = new Drawable[] { new Circle(10, 20, 15), 
                                              new Circle(30, 20, 10),
                                              new Rectangle(5, 8, 8, 9) };
      for (int i = 0; i < drawables.length; i++)
         drawables[i].draw(Drawable.RED);
   }
}
 
//Example: List is a Java interface that describes a sequential collection of objects. 
// ArrayList and LinkedList are implementation of the List interface.
List names1 = new ArrayList<String>();
List names2 = new LinkedList<String>();
void print(List x)
{
//...
}

//Example: marker interface
//An interface with an empty body is known as a marker interface or a tagging interface. 
//The interface exists only to associate meta data with a class. 
//For example, Cloneable (see Inheritance in Java, Part 2) implies that instances of its implementing class can be shallowly cloned. 
//When Object's clone() method detects (via runtime type identification) that the calling instance's class implements Cloneable, 
//it shallowly clones the object.

//Example: SAM Interface vs functional interface
// * Runnable, Comparable, Cloneable are called as SAM Interfaces (Single Abstract Method interfaces) in earlier JDK
// * 
// * With Java 8, "A functional interface is an interface that has just one abstract method (aside from the methods of Object ), 
// * and thus represents a single function contract." 
// * Java 8 also introduced "default" and "static" methods in Interfaces, as they are not abstract method, so we don’t count them.
// * Methods from object class we also don’t count.
// * 
// * Comparator interface in java 8 has 2 non default methods 
// *  ie compare(T o1, T o2) and equals(Object obj).
// *  It is still called functional interface.

// * Simply because an interface happens to have single abstract method, it should not be considered as a functional interface.
// * The latter is the purpose of the @FunctionalInterface annotation.
// * 
// * Notably, the Comparable interface lacks the @FunctionalInterface annotation.
// * Comparable is not designed to be used as a single function, but is always meant to be implemented by a class, 
// * which has natural ordering for its instances, by adding this single function.
// * Which would mean that it is not designed to be created by using a lambda expression.
 

//Questions: Object?
// If an interface does not extend Object class, then why we can call methods of Object class on interface variable like below?
interface A
{    

}

class InterfaceAndObjectClass
{
    public static void main(String[] args)
    {
        A a = null;
 
        a.equals(null);
 
        a.hashCode();
 
        a.toString();
    }
}

//If an interface does not extend Object class, then why the methods of Object class are visible in interface?
interface B
{
    @Override
    public boolean equals(Object obj);
 
    @Override
    public int hashCode();
 
    @Override
    public String toString();
}
*/

/*
This is because, for every public method in Object class, there is an implicit abstract and public method declared in every interface 
which does not have direct super interfaces. 
This is the standard Java Language Specification which states like this:

“If an interface has no direct superinterfaces, then the interface implicitly declares a public abstract member method m with signature s, 
return type r, and throws clause t corresponding to each public instance method m with signature s, 
return type r, and throws clause t declared in Object, 
unless a method with the same signature, same return type, and a compatible throws clause is explicitly declared by the interface.”
*/

 


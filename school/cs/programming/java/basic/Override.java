package basic;

public class Override {
/*
 * (1) Only public, protected and default (in the same package) can be overridden. 
 * That also means private methods cannot be overridden.
 * 
 * The overriding method must not have more restrictive access modifier.
 * default, then the overriding one must be default, protected or public.
 * protected, then the overriding one must be protected or public.
 * public, then the overriding one must be only public.
 * 
 * (2) Final and static methods cannot be overridden.
 * A static method in a subclass may hide another static one in a superclass, and that’s called hiding.
 * When a static method of the superclass is hidden, it requires the subclass to use a fully qualified 
 * class name of the superclass to invoke the hidden method.
 * 
 * Similarly, you cannot override a private method in sub class because it's not accessible there, 
 * what you do is create another private method with the same name in the child class.
 * 
 * (3) The overriding method must have same argument list. 
 * If we add a new argument to the method,then it is not an overriding, it is an overload instead.
 * 
 * (4) The overriding method must have same return type (or subtype).
 * It’s possible to modify the return type to a subclass.
 * 
 *  One shortcoming of clone() method is that it return Object, which means user of clone() method must 
 *  do type casting to get correct type of object. 
 *  From Java 1.5 onwards an overriding method can return subclass of return type declared in original method, 
 *  which means you can return sub class from clone method. It is known as co-variant method overriding. 
 *  This will prevent lot of type casting at client side. 
 *  Unfortunately clone() method of java.util.Date is not updated to take advantage of this change made in Java 5. 
 *  Which means you need to cast cloned object into Date, before using it.
 * 
 * (5) The overriding method must not throw new or broader checked exceptions.
 * eg, FileNotFoundException is a subclass of the FileIOException.
 * 
 * However, it is legal to override unchecked exception, 
 * eg,  IllegalArgumentException is an unchecked exception.
 * eg,  NullPointerException is unchecked, we can override it with a method which throws it's parent class RuntimeException.
 * 
 * (6) Use the super keyword to invoke the overridden method from a subclass.
 * 
 * (7) Constructors cannot be overridden.
 * 
 * (8) The synchronized modifier has no effect on the rules of overriding.
 * a synchronized method can override a non-synchronized one and vice versa.
 * 
 * (9) The strictfp modifier has no effect on the rules of overriding.
 * The strictfp keyword is used to force the precision of floating point calculations (float or double) in Java conform IEEE
 * ensures result of floating point computations is always same on all platforms.
 * 
 * strictfp keyword can be applied for classes, interfaces and class methods, but not for interface methods, or constructors.
 * If an interface or class is declared with strictfp, then all methods and nested types within are implicitly strictfp.
 * 
 * 
 */
}

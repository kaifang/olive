package test;

import java.util.Arrays;
import java.util.Date;

public final class ArrayCopier {

	public static void main(String[] args) {
		//String[] x = { "one", "two", "three", "four", "five" };
	    int[] numbers = {1,2,3,4,5,6,7,8,9,10};
	    copyUsingClone(numbers);
	    copyUsingSystem(numbers);
	    copyUsingArraysCopyOf(numbers);
	    copyUsingArraysCopyOfRange(numbers);
	    copyUsingForLoop(numbers);
	}

	private static void copyUsingClone(int[] aArray) {
		// Arrays inherit methods from Object class
		// call its clone method, and do a cast
		int[] copy = (int[]) aArray.clone();
		System.out.println(Arrays.toString(copy));

		// Note, multi-dimensional array does *not* have independant storage
		// only a shallow clone is performed
		int[][] matrix = { {1,1}, {1,1} };
	    int[][] matrixClone = (int[][])matrix.clone();
	    //set 0-0th element to 0, and compare
	    matrixClone[0][0] = 0;
	    System.out.println("Altered clone has affected original:");
	    System.out.println("matrixClone element 0-0:" + matrixClone[0][0]);
	    System.out.println("matrix element 0-0: " + matrix[0][0]);
	    
	  //the clone of an array of objects as well is only shallow
	    Date[] dates = {new Date()};
	    System.out.println("Original date: " + dates[0]);
	    Date[] datesClone = (Date[])dates.clone();
	    datesClone[0].setTime(0);
	    System.out.println("Altered clone has affected original:");
	    System.out.println("datesClone[0]:" + datesClone[0]);
	    System.out.println("dates[0]: " + dates[0]);
	}

	private static void copyUsingArraysCopyOf(int[] aArray) {
		int[] copy = Arrays.copyOf(aArray, aArray.length);
		System.out.println(Arrays.toString(copy));
		
		//Note, a shallow copy of objects if applied on an array of non-primitive object types. 
//		Employee[] copiedArray = Arrays.copyOf(employees, employees.length);		 
//		employees[0].setName(employees[0].getName() + "_Changed");		  
//		assertArrayEquals(copiedArray, array);
	}

	private static void copyUsingArraysCopyOfRange(int[] aArray) {
		int[] copy = Arrays.copyOfRange(aArray, 0, aArray.length); // full copy of the array
		// Arrays.copyOfRange(x, x.length-2, x.length); //copy only the last 2 elements
		System.out.println(Arrays.toString(copy));
		
		//Note, a shallow copy of objects if applied on an array of non-primitive object types. 
	}

	private static void copyUsingSystem(int[] aArray) {
		// System.arraycopy(Object src, int srcPos, Object dest, int destPos, int length)
		int[] copy = new int[aArray.length];
		System.arraycopy(aArray, 0, copy, 0, aArray.length);
		System.out.println(Arrays.toString(copy));
	}
	
	private static void copyUsingStream(int[] aArray) {
		//int[] copy = Arrays.stream(aArray).toArray(int[]::new);
		int[] copy = Arrays.stream(aArray).toArray();
		System.out.println(Arrays.toString(copy));
		
		String[] strArray = {"orange", "red", "green'"};
		String[] copiedArray = Arrays.stream(strArray).toArray(String[]::new);
		
		//For the non-primitive types, it will also do a shallow copy of objects
	}

	private static void copyUsingForLoop(int[] aArray) {
		int[] copy = new int[aArray.length];
		for (int idx = 0; idx < aArray.length; ++idx) {
			copy[idx] = aArray[idx];
		}
		System.out.println(Arrays.toString(copy));
	}
	
	/*
	 * Apache Commons 3 offers a utility class called SerializationUtils that provides a clone() method. 
	 * It is very useful if we need to do a deep copy of an array of non-primitive types.
	 * This class requires that each object should implement the Serializable interface. 
	 */
//	public class Employee implements Serializable {
//	    // ...
//	}
//	 
//	Employee[] employees = createEmployeesArray();
//	Employee[] copiedArray = SerializationUtils.clone(employees);
//
//	employees[0].setName(employees[0].getName() + "_Changed");
//	assertFalse(copiedArray[0].getName().equals(employees[0].getName()));
}

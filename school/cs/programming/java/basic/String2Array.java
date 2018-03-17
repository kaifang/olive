package test;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class String2Array {

	public static void main(String[] args) {

		String str = "abcdef";

		// In java 8
		char[] charArr = str.toCharArray(); // [a,b,c,d,e,f]
		System.out.println(charArr);

		String[] strArr = str.split("");
		System.out.println(strArr);
		System.out.println(Arrays.toString(strArr)); // [, a, b, c, d, e, f]
		// In Java 8, the empty first element is no longer included.

		String[] myStrArray = { "this", "is", "java", "test" };

		String num = "22,33,44,55,66,77,0";

		// Option 1 : 3 steps
		// (1) First we are splitting the string -->split
		String[] strArray = num.split(",");
		System.out.println("--- String Array: String[]---");
		System.out.println(strArray);
		System.out.println(Arrays.toString(strArray));

		// (2) Then to ArrayList<String> while passing the substring -->Arrays.asList
		List<String> aList = new ArrayList<String>();
		aList = Arrays.asList(strArray);
		System.out.println("--- String List: ArrayList<String> ---");
		System.out.println(aList);
		for (String s : aList) {
			System.out.println(s);
		}
		// (3) Then to ArrayList<Integer> -->Integer.parseInt
		List<Integer> iList = new ArrayList<Integer>();
		for (String s : aList) {
			iList.add(Integer.parseInt(s.trim()));
		}
		System.out.println("--- Integer List: ArrayList<Integer> ---");
		System.out.println(iList.toString());
		iList.forEach(datint -> System.out.println(datint));

		// (4) Then to int[] --> intValue()
		System.out.println("--- int array: int[] ---");
		int[] intArr = list2IntArray(iList);
		System.out.println(Arrays.toString(intArr));

		//
		System.out.println("--- parseInt ---");
		int[] intArr2 = string2IntArray2(num);
		System.out.println(Arrays.toString(intArr2));

		//
		System.out.println("--- Stream ---");
		int[] intArr3 = string2IntArray3(num);
		System.out.println(Arrays.toString(intArr3));
	}

	public static int[] list2IntArray(List<Integer> list) {
		int[] ret = new int[list.size()];
		int i = 0;
		for (Integer e : list)
			ret[i++] = e.intValue();
		return ret;
	}

	/*
	 * convert a String separated with whitespace (or comma) into int[] array
	 */
	// Option 2 : 2 steps
	public static int[] string2IntArray2(String intString) {
		// (1) First we are splitting the string -->split
		//String[] intStringSplit = intString.split(" "); // or split("\\s");
		String[] intStringSplit = intString.split("[,\\s]+");
		int[] intArray = new int[intStringSplit.length];
		System.out.println("This is initial array: (surprise! it has be preset with 0s)");
		System.out.println(Arrays.toString(intArray));

		// (2) loop through -->Integer.parseInt
		for (int i = 0; i < intStringSplit.length; i++) {
			try {
				intArray[i] = Integer.parseInt(intStringSplit[i]); // Exception in this line
			} catch (NumberFormatException e) { //unchecked (= subclass of RuntimeException )
				System.out.println("This is not an integer:");
				System.out.println(intStringSplit[i]);
				e.printStackTrace();
			}
		}

//		 for (int number : intArray) {
//		    System.out.println(number);
//		 }

		return intArray;
	}

	// Option 3 : Java 8 Streams
	public static int[] string2IntArray3(String intString) {
		int[] intArray = Arrays.stream(intString.split("[,\\s]+")).mapToInt(Integer::parseInt).toArray();
		return intArray;
	}
}

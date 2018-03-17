package lab2;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

import test.String2Array;

public class SortArray {

	public static void main(String[] args) throws IOException {
		BufferedReader bi = new BufferedReader(new InputStreamReader(System.in));
		System.out.println("Enter a String of int separated with whitespace:");

		String str = bi.readLine();
		int[] numArr = String2Array.string2IntArray2(str);
		System.out.println(Arrays.toString(numArr));
		
		System.out.println("Ready, Enter a String of int separated with whitespace:");

		String[] strNums;
		strNums = bi.readLine().split("\\s");

		int num[] = new int[strNums.length];
		for (int i = 0; i < strNums.length; i++) {
			num[i] = Integer.parseInt(strNums[i]);
		}

		System.out.println("Enter another:");

		String[] strNums2;
		strNums2 = bi.readLine().split("\\s");

		int num2[] = new int[strNums2.length];
		for (int i = 0; i < strNums2.length; i++) {
			num2[i] = Integer.parseInt(strNums2[i]);
		}

		// with Java 8 Streams
		// intArray =
		// Arrays.stream(intString.split("\\s")).mapToInt(Integer::parseInt).toArray();

		// Apache commons and Guava
		// int[] both = (int[])ArrayUtils.addAll(num, num2);

		int[] both = concat(num, num2);
		System.out.println("combine:");
		System.out.println(Arrays.toString(both));
		
		System.out.println("sorted:");
		int[] sorted = mergeAndSortIntArrays(num, num2);
		System.out.println(Arrays.toString(sorted));

	}

	// keep in mind that, here we are combining two arrays, we are not merging
	// arrays
	// i.e. if both array contains same element, they will be repeated in combined
	// array.
	public static int[] concat(int[] a, int[] b) {
		int length = a.length + b.length;
		int[] result = new int[length];
		System.arraycopy(a, 0, result, 0, a.length);
		System.arraycopy(b, 0, result, a.length, b.length);
		return result;
	}

	public final static int[] merge(final int[]... arrays) {
		int size = 0;
		for (int[] a : arrays)
			size += a.length;

		int[] res = new int[size];

		int destPos = 0;
		for (int i = 0; i < arrays.length; i++) {
			if (i > 0)
				destPos += arrays[i - 1].length;
			int length = arrays[i].length;
			System.arraycopy(arrays[i], 0, res, destPos, length);
		}

		return res;
	}
	
	public static int[] mergeAndSortIntArrays(int[] firstInt, int[] secondInt){
	    //cannot store primitives in ArrayList
	    //List<Integer> first = Arrays.asList(firstInt);
	    //List<Integer> second = Arrays.asList(secondInt);
		
		// have to do this
	    List<Integer> merged = new ArrayList<>();
	    for (int i=0; i<firstInt.length; i++){
	        merged.add(firstInt[i]);
	    }
	    for (int i=0; i<secondInt.length; i++){
	        merged.add(secondInt[i]);
	    }
	    
	    Collections.sort(merged);
	    
	    // option 1
	    int[] result=new int[merged.size()];
	    for (int i=0; i<merged.size(); i++){
	        result[i]=merged.get(i);
	    }
	    
	    // option 2
	    //Object[] c = merged.toArray();
	    //List<T>.toArray won't work because there's no conversion from Integer to int
	    // import com.google.common.primitives.Ints;
	    //int[] p = Ints.toArray(merged);
	    
	    //option 3, Java 8
	    int[] primitive = merged.stream().mapToInt(Integer::intValue).toArray();
		//note: toArray() throws a NullPointerException if any null values are present in the list
	    int[] primitive2 = merged.stream().filter(Objects::nonNull).mapToInt(Integer::intValue).toArray();
	    // or map null to 0
	    int[] primitive3 = merged.stream().map(i -> (i ==null ? 0 :i)).mapToInt(Integer::intValue).toArray();
	    
	    System.out.println("using stream:");
		System.out.println(Arrays.toString(primitive));
		System.out.println(Arrays.toString(primitive2));
		System.out.println(Arrays.toString(primitive3));		
	    
	    return result;
	}

}

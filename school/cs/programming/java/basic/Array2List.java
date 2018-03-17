package test;
import java.util.Arrays;
import java.util.stream.IntStream;

public class Array2List {

	public static void main(String[] args) {
		
		// (1) Array[object] to List
		
		//public static final String[] myStrArray = new String[] {"AB","BC","CD","AE"};

		String[] myStrArray = { "this", "is", "java" , "test" };
		String testValue="java";
		boolean contains = Arrays.asList(myStrArray).contains(testValue); // returns true
		System.out.println(contains);

		// (2) Array[primitive] 
		
		//Caveats: 	can not store primitives in ArrayList	
		//Arrays.asList(yourArray).contains(yourValue)
		//doesn't work for arrays of primitives
		final int[] a = {1,2,3,4};
		int testNum = 3;
		//List<Integer> list = Arrays.asList(a);  //error
		contains = Arrays.asList(a).contains(testNum);
		System.out.println(contains);  // does not work!

		//use a Stream instead:
		contains = IntStream.of(a).anyMatch(x -> x == 4);
		System.out.println(contains);
		
		// (3) print out Array
		int rows = 2, columns =3;
		int[] array1 = new int[rows];
		System.out.println("---- 1D array ----");
		System.out.println(Arrays.toString(array1));
		
		// 2D Array
		int[][] array2 = get2D(rows, columns, 5);
		System.out.println("---- 2D array ----");
		System.out.println(Arrays.deepToString(array2));
		System.out.println(Arrays.deepToString(array2).replace("], ", "]\n").replace("[[", "[").replace("]]", "]"));

		// or
		for (int[] row : array2)
		{
		    Arrays.fill(row, 6);
		    System.out.println(Arrays.toString(row));
		}

	}
	
	public static int[][] get2D(int rows, int columns, int value) {
		int[][] array = new int[rows][columns];
		for(int i = 0; i<rows; i++)
		    for(int j = 0; j<columns; j++)
		        array[i][j] = value;
		return array;
	}

}

package lab2;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;

public class IntMatrix {
	public static int[][] d = { { 1, 2, 3 }, { 4, 5, 6 }, { 9, 1, 3 } };

	public static void main(String[] args) throws NumberFormatException, IOException {

		System.out.println(Arrays.deepToString(d));

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		System.out.println("To build a NxN matrix, enter an integer N:");
		int n = Integer.parseInt(br.readLine());

		int[][] matrix = new int[n][n];

		for (int i = 0; i < n; i++) {
			System.out.println("Enter a row: (eg, 0 1 0 1)");
			String intString = br.readLine();
			System.out.println("split to array:");
			String[] intStringSplit = intString.split(" ");
			System.out.println(intStringSplit);
			System.out.println(Arrays.toString(intStringSplit));

			// int[] intArray = new int[intStringSplit.length];
			for (int j = 0; j < intStringSplit.length; j++) {
				matrix[i][j] = Integer.parseInt(intStringSplit[j]); // Exception in this line
			}
		}

		System.out.println("---- 2D array ----");
		System.out.println(Arrays.deepToString(matrix));

	}

}

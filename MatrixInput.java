package lab2;

import java.util.Scanner;

public class MatrixInput {

	public static void main(String[] args) {
		int[][] matrix = new int[3][2];
		System.out.println("Matrix M[3][2]\n");
		
		@SuppressWarnings("resource")
		Scanner input = new Scanner(System.in);

		for (int row = 0; row < 3; row++) {
			for (int column = 0; column < 2; column++) {
				System.out.printf("Type the element M[%d][%d]: ", row + 1, column + 1);
				matrix[row][column] = input.nextInt();
			}
		}

		System.out.println("\n The Matrix now is: \n");
		for (int row = 0; row < 3; row++) {
			for (int column = 0; column < 2; column++) {
				System.out.printf("\t %d \t", matrix[row][column]);
			}
			System.out.println();
		}

	}

}

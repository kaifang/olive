package lab2;

import java.util.Arrays;

public class CountMatrix {
	//public static int[][] d = { { 1, 2, 3 }, { 4, 5, 6 }, { 9, 1, 3 } };
	public static int[][] d = { { 1, 0, 1 }, { 0, 1, 1}, { 1, 1, 1 } };

	public static void main(String[] args)  {

		System.out.println(Arrays.deepToString(d));

		int m = d.length;
		int n = d[0].length;

		for (int i = 0; i < m; i++) {
			for (int j = 0; j < n; j++) {
				//System.out.print( "* ");
				countMines(i, j);
			}
				
			System.out.println();
		}

	}
	
	public static int countMines(int x, int y) {
		int count =0;
		
		for (int i=x-1; i<= x+1; i++ ) {
			if (i < 0 || i > d.length-1)
				continue;
			
			for (int j=y-1; j<= y+1; j++) {
				if (j< 0 || j > d.length-1 || (i==x && j==y))
					continue;
				
				count+= d[i][j];
			}
		}
		
		System.out.print(count + " ");
		return count;
	}

}

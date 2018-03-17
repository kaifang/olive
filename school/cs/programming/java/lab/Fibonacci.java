package lab;
import java.util.Scanner;

//The first two numbers in the Fibonacci sequence are 0 and 1, and each subsequent number is the sum of the previous two. 
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, …
// F0 = 0 and F1 = 1.
// Fn = Fn-1 + Fn-2
public class Fibonacci {

	// @SuppressWarnings("resource")
	public static void main(String[] args) {
		System.out.println("Enter an integer:");
		Scanner scanner = new Scanner(System.in);
		int n = scanner.nextInt();
		//scanner.close();
		
        System.out.print("Fibonacci("+ n +"):");
		System.out.println(fibonacci(n));

        System.out.println("Fibonacci Series of "+ n +" numbers:");

		// dummy
		int febCount = n + 1;
		int[] feb = new int[febCount];
		feb[0] = 0;
		feb[1] = 1;
		for (int i = 2; i < febCount; i++) {
			feb[i] = feb[i - 1] + feb[i - 2];
		}

		for (int i = 0; i < febCount; i++) {
			System.out.print(feb[i] + " ");
		}
		System.out.println();

		// recursion
		for (int i = 0; i < febCount; i++) {
			System.out.print(fibonacci(i) + " ");
		}
		System.out.println();
		
		System.out.println("Enter an integer which is less:");
		int t = scanner.nextInt();
		scanner.close();
		
        System.out.print("next Fibonacci after "+ t +" is:");
		System.out.println(getNextFib(t));

	}

	// recursion
	public static long fibonacci(int n) {
		if (n <= 1)
			return n;
		else
			return fibonacci(n - 1) + fibonacci(n - 2);
	}

	// non-recursive
	public static double fib2(int n) {
		double prev = 0d, next = 1d, result = 0d;
		for (int i = 0; i < n; i++) {
			result = prev + next;
			prev = next;
			next = result;
		}
		return result;
	}
	
	// get next one larger than x
	public static int getNextFib(int x) {
		int prev = 0, next = 1, result = 0;
		do {
			result = prev + next;
			prev = next;
			next = result;
		} while (result <= x);
		
		return result;
	}
}

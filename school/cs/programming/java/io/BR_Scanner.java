package basic;
import java.io.*;
import java.util.Scanner;

//three different ways for reading input from the user in the command line environment(console).
public class BR_Scanner {

	public static void main(String[] args) throws IOException // throws java.lang.Exception
	{
		// (1) wrapping the System.in (standard input stream) in an InputStreamReader which is wrapped in a BufferedReader
		// Advantages: The input is buffered for efficient reading.
		// usage: reader.readLine(), read other types, use Integer.parseInt(), Double.parseDouble().
		// To read multiple values, use split().
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		System.out.println("Enter an integer");
		int a = Integer.parseInt(br.readLine());
		System.out.println("Enter a String");
		String b = br.readLine();
		System.out.printf("You have entered: integer- " + a + " and name-" + b);

/*		try (BufferedReader br = new BufferedReader(new FileReader(path))) {
			return br.readLine();
		}*/

		// (2) The main purpose of the Scanner class is to parse primitive types and strings using regular expressions,
		// however it is also can be used to read input from the user in the command line.
		// Drawback: The reading methods are not synchronized
		
		Scanner scn = null;
		try {
			scn = new Scanner(System.in);
			System.out.println("Enter an integer");
			a = scn.nextInt();
			System.out.println("Enter a String");
			b = scn.nextLine();
			System.out.printf("[Scanner] You have entered: integer- " + a + " " + "and name as " + b);
		} finally { // Prior to Java SE 7, use a finally block to ensure that a resource is closed
			if (scn != null)
				scn.close();
		}
		// However, in this example, if the methods nextLine and close both throw
		// exceptions,
		// It throws the exception thrown from the finally block; the exception thrown
		// from the try block is suppressed.

		// Better to try with resource statement
		try (Scanner scanner = new Scanner(System.in)) {
			// rest of your code
		}
		// In contrast, in the example if exceptions are thrown from both the try block
		// and the try-with-resources statement,
		// then it throws the exception thrown from the try block; the exception thrown
		// from the try-with-resources block is suppressed.

		/*
		 * In Scanner class if we call nextLine() method after any one of the seven
		 * nextXXX() method then the nextLine() doesn’t not read values from console and
		 * cursor will not come into console it will skip that step. The nextXXX()
		 * methods are nextInt(), nextFloat(), nextByte(), nextShort(), nextDouble(),
		 * nextLong(), next().
		 */
		
		/*
		 * In BufferReader class there is no such type of problem. This problem occurs
		 * only for Scanner class, due to nextXXX() methods ignore newline character and
		 * nextLine() only reads newline character. If we use one more call of
		 * nextLine() method between nextXXX() and nextLine(), then this problem will
		 * not occur because nextLine() will consume the newline character.
		 */
		
		// (3)  Using Console to input data from user
		// Advantages:
		//Reading password-like input without echoing the entered characters.
		//Reading methods are synchronized.
		//Format string syntax can also be used (like System.out.printf()).
		
        	String name = System.console().readLine();
        	System.out.println(name);
	}
}

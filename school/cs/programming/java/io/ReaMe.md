# InputStream vs Reader
`InputStream` is used to read binary data, while `Reader` is used to read text data, precisely Unicode characters

everything you read is essentially bytes, but to convert a byte to text, you need a character encoding scheme. 

`Reader` classes uses character encoding to decode bytes and return characters to caller.
`Reader` can either use default character encoding of platform on which your Java program is running,
or accept a Charset object or name of character encoding in String format e.g. "UTF-8". 

Remember, if you don't specify correct encoding, or your program is not using character encoding already present in protocol 
e.g. encoding specified in "Content-Type" for HTML files and encoding presents in header of XML files, you may not read all data correctly.
Some characters which are not present in default encoding, may come up as ? or little square.

`InputStreamReader` is a bridge from byte streams to character streams. 
It reads bytes and decodes them into characters using a specified charset.

### InputStream
##### `InputStream` is used for reading byte based data, one byte at a time.
```
InputStream inputstream = new FileInputStream("c:\\test\\data.txt");

int data = inputstream.read();
while(data != -1) {
  data = inputstream.read();
}
inputstream.close();
```

##### `InputStream`also contains two read() methods which can read data into a byte array.
```
int read(byte[])
int read(byte[], int offset, int length)
```

```
InputStream inputstream = new FileInputStream("c:\\test\\data.txt");

byte[] data      = new byte[1024];
int    bytesRead = inputstream.read(data);

while(bytesRead != -1) {
  doSomethingWithData(data, bytesRead);
  bytesRead = inputstream.read(data);
}
inputstream.close();
```

##### When you are done with a Java InputStream you must close it
If an exception is thrown while reading data from the InputStream, the close() method is never called. 
To make the code more robust, you should use the Java try-with-resources construct.

```
try( InputStream inputstream = new FileInputStream("file.txt") ) {
    int data = inputstream.read();
    while(data != -1){
        data = inputstream.read();
    }
}
```
Once the executing thread exits the try block, the inputstream variable is closed. 
If an exception is thrown from inside the try block, the exception is caught, the InputStream is closed, 
and then the exception is rethrown. 

### FileInputStream vs FileReader (parent `InputStreamReader`)
`FileInputStream` is used to read binary data, while `FileReader` is used to read character data.

Example 1 - Reading File's content using FileInputStream 
```
try (FileInputStream fis = new FileInputStream("data.txt")) { 
   int data = fis.read(); 
   //You can cast the returned int to a char like this:
   // char aChar = (char) data;
   
   while (data != -1) { 
      System.out.print(Integer.toHexString(data)); 
      data = fis.read(); 
   } 
} 
catch (IOException e) {  
   System.out.println("Failed to read binary data from File"); 
   e.printStackTrace(); 
}
```

Example 2 - Reading File's content using FileReader 
```
try (FileReader reader = new FileReader("data.txt")) { 
   int character = reader.read(); 
   while (character != -1) { 
      System.out.print((char) character); 
      character = reader.read(); } 
} 
catch (IOException e) {  
   System.out.println("Failed to read character data from File"); 
   e.printStackTrace(); 
}
```

Though its advised to use `BufferedReader` to read data from file

### BufferedReader vs Scanner
A `Scanner` is simple text scanner which can parse primitive types and strings using regular expressions.
```
  File file = new File("sample.dat");
  BufferedReader in = new BufferedReader(new FileReader(file));
  //for (String x = in.readLine(); x != null; x = in.readLine()) {
  String line = null;
  Scanner scanner = null;
  while ((line = reader.readLine()) != null) {
      System.out.println(line);
      
      // option 1: use String.split
      //String[] tokens = line.split("\\|");
      String[] tokens = line.split(",");
      for (String token : tokens)
      {
          System.out.println(token);
      }  
      
      // option 2: use Scanner
      scanner = new Scanner(line);
      scanner.useDelimiter(",");
      StringBuilder sb = new StringBuilder();
      while (scanner.hasNext()) {
        String data = scanner.next();
        System.out.println(data);
        if (StringUtils.isNotBlank(data) && data.contains("#")) {
           sb.append(data);
           sb.append(System.lineSeparator());
        }
        
      }  
      
  }      
```  

Scanner.next() does not read a newline but reads the next token, delimited by whitespace (by default, if useDelimiter() was not used to change the delimiter pattern). 
To read a line use Scanner.nextLine()

### filtered streams

Example 1: read numeric type

```
//File
//FileInputStream  (ready only bytes and byte arrarys)
//BufferedInputStream
//ZipInputStream (optional)
//DataInputStream (can read numeric types) :

double d = din.readDouble();
```

Example 2: read character
```
//File
//NA, FileInputStream
//FileReader, InputStreamReader(specify encoding)
//BufferedReader

BufferedReader reader = new BufferedReader(new FileReader(new File(fileName)));
String line = reader.readLine();

BufferedReader reader2 = new BufferedReader(new InputStreamReader(
                    new FileInputStream(new File(fileName)), 
                    StandardCharsets.UTF_8));
                    
```
`FileReader` is used for reading character files. It uses system default character encoding. 
Since `FileReader` relies on system character settings, it is not recommended to use this class. 
We should use `InputStreamReader` instead.

### Java 8 streaming API
The contents of the text file are read using the Files.lines() method.
```
   String fileName = "src/test.txt";
   StringBuilder sb = new StringBuilder();
   Files.lines(Paths.get(fileName)).forEachOrdered(s -> {
            sb.append(s); 
            sb.append(System.lineSeparator());
        });
   System.out.println(sb);
```        

BufferedReader reader = null;

//Prior to Java SE 7, use a finally block to ensure that a resource is closed 
//regardless of whether the try statement completes normally or abruptly
try {
    File file = new File("sample-file.dat");
    reader = new BufferedReader(new FileReader(file));

    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }

} catch (IOException e) {
    e.printStackTrace();
} finally {
    try {
        reader.close();
    } catch (IOException e) {
        e.printStackTrace();
    }
}

//Should use the try-with-resources statement: a resource is any object that implements java.lang.AutoCloseable, 
//which includes all objects which implement java.io.Closeable, can be used as a resource.
try (BufferedReader br = new BufferedReader(new FileReader(path))) {
    return br.readLine();
}

//Note: A try-with-resources statement can have catch and finally blocks just like an ordinary try statement. 
//In a try-with-resources statement, any catch or finally block is run after the resources declared have been closed

BufferedReader reader = null;

//Prior to Java7, use a finally block to ensure that a resource is closed 
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
//However, if the methods readLine and close both throw exceptions, 
//then the above code throws the exception thrown from the finally block; the exception thrown from the try block is suppressed.


//Java7 introduces the try-with-resources statement: a resource is any object that implements java.lang.AutoCloseable, 
//which includes all objects which implement java.io.Closeable, can be used as a resource.
try (BufferedReader br = new BufferedReader(new FileReader(path))) {
    return br.readLine();
}

//if exceptions are thrown from both the try block and the try-with-resources statement, 
//then the code throws the exception thrown from the try block; 
//the exception thrown from the try-with-resources block is suppressed. You can retrieve suppressed exceptions.

//You can declare one or more resources in a try-with-resources statement, separated by a semicolon.
java.nio.charset.Charset charset = java.nio.charset.StandardCharsets.US_ASCII;
java.nio.file.Path outputFilePath = java.nio.file.Paths.get(outputFileName);

    // Open zip file and create output file with 
    // try-with-resources statement
    try (
        java.util.zip.ZipFile zf =
             new java.util.zip.ZipFile(zipFileName);
        java.io.BufferedWriter writer = 
            java.nio.file.Files.newBufferedWriter(outputFilePath, charset)
    ) {
        // Enumerate each entry
        for (java.util.Enumeration entries = zf.entries(); entries.hasMoreElements();) {
            // Get the entry name and write it to the output file
            String newLine = System.getProperty("line.separator");
            String zipEntryName =
                 ((java.util.zip.ZipEntry)entries.nextElement()).getName() +
                 newLine;
            writer.write(zipEntryName, 0, zipEntryName.length());
        }
    }
//When the block of code that directly follows it terminates, either normally or because of an exception, 
//the close methods of the BufferedWriter and ZipFile objects are automatically called in this order. 
//Note that the close methods of resources are called in the opposite order of their creation.

//Note: A try-with-resources statement can have catch and finally blocks just like an ordinary try statement. 
//In a try-with-resources statement, any catch or finally block is run after the resources declared have been closed

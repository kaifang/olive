# ANT

#### Basic:

```
    <target name="run">
        <java jar="build/jar/HelloWorld.jar" fork="true"/>
    </target>
``` 
or cmd line:

```
java -jar build\jar\HelloWorld.jar
```
 
#### Enhance 0:  using property and <project> tag

```
<project name="HelloWorld" basedir="." default="main">
 
    <property name="build.dir"   value="build"/>
    <property name="classes.dir" value="${build.dir}/classes"/>
   <property name="jar.dir"     value="${build.dir}/jar"/>
   <property name="main-class"  value="oata.HelloWorld"/>
   <property name="external" value="bin/external-libs.jar" />
 
    <echo message="jarfile : ${jar.dir}/${ant.project.name}.jar " />
    <echo message="classpath.name : ${classpath.name} " />
                
    <mkdir dir="${dist.dir}" />
    <delete dir="${build.dir}"/>
```    
 
#### Enhance 1: add external lib

Log4J is not on the classpath so running ANT now will get compiler error. But do not change the CLASSPATH environment variable! 
This is one of the most famous mistakes when working with Ant.  
Should put Log4J (and all other libraries under .\lib) into the buildfile:
 
``` 
    <property name="lib.dir"     value="lib"/>
 
    <path id="classpath">
        <fileset dir="${lib.dir}" includes="**/*.jar"/>
    </path>
``` 

or better

```
     <path id="classpath">
                <fileset dir="${basedir}/">
                        <include name="${lib.dir}/*.jar" />
                </fileset>
    </path>
```

#### Enhance 2: add other resources (as long as they haven't the suffix .java) to the build directory, 
so we could start the application from that directory and these files will included into the jar.

For example: the file "src/log4j.properties"

```
    <target name="compile">
        <mkdir dir="${classes.dir}"/>
        <javac srcdir="${src.dir}" destdir="${classes.dir}" classpathref="classpath"/>
        <copy todir="${classes.dir}">
            <fileset dir="${src.dir}" excludes="**/*.java"/>
        </copy>
    </target>
``` 

or better add a new target

```
        <target name="copy-dependencies">
                <copy todir="${build.dir}/resources">
                        <fileset dir="${resources.dir}" />
                </copy>         
        </target>
```

#### Enhance 3: a new run cmd if there are external libs.
we start our application not via its Main-Class manifest-attribute, because we could not provide a jar-name and a classpath. 
So add our class in the red line to the already defined path and start as usual. 

```
    <target name="run" depends="jar">
        <java fork="true" classname="${main-class}">
            <classpath>
                <path refid="classpath"/>
                <path location="${jar.dir}/${ant.project.name}.jar"/>  <!-- red -->
            </classpath>
        </java>
    </target>
```

or better

```
   <!-- reuse the path to our jar file by giving it an id and making it globally available. -->
    <path id="application" location="${jar.dir}/${ant.project.name}.jar"/>
 
    <target name="run" depends="jar">
        <java fork="true" classname="${main-class}">
            <classpath>
                <path refid="classpath"/>
                <path refid="application"/>  <!-- red -->
            </classpath>
        </java>
    </target>
``` 
 
 #### Enhance 4: add junit
// Ant has a built-in JUnit 4.12

```
    <target name="junit" depends="jar">
 
        <!-- The printsummary=yes lets us see more detailed information than just a "FAILED" or "PASSED" message. -->
        <junit printsummary="yes">
            <classpath>
                <path refid="classpath"/>
                <path refid="application"/>
            </classpath>
 
            <batchtest fork="yes">
                <fileset dir="${src.dir}" includes="**/*Test.java"/>
            </batchtest>
        </junit>
    </target>
```

#### Enhance 5: add junit report
There are two steps: 
1. let <junit> log the information and 
2. convert these log files to something readable (browsable).

The log format is XML so junitreport could parse it. In a second target junitreport should create a browsable HTML report for all generated XML log files in the report directory. 
Now you can open the ${report.dir}\index.html and see the result (looks something like JavaDoc).

```
    <property name="report.dir"  value="${build.dir}/junitreport"/>
    
    <target name="junit" depends="jar">
        <mkdir dir="${report.dir}"/>
        <junit printsummary="yes">
            <classpath>
                <path refid="classpath"/>
                <path refid="application"/>
            </classpath>
 
            <formatter type="xml"/>
 
            <batchtest fork="yes" todir="${report.dir}">
                <fileset dir="${src.dir}" includes="**/*Test.java"/>
            </batchtest>
        </junit>
    </target>
 
    <target name="junitreport">
        <junitreport todir="${report.dir}">
            <fileset dir="${report.dir}" includes="TEST-*.xml"/>
            <report todir="${report.dir}"/>
        </junitreport>
    </target>
```

#### Enhance 6: jar everything!

```
        <!-- jar it, and declares the thirdparty libraries in manifest.mf file -->
        <target name="jar" depends="compile, copy-dependencies" description="package everything to JAR">
 
                <jar jarfile="${external}">
                        <zipgroupfileset dir="lib/">
                                <include name="**/*.jar" />
                        </zipgroupfileset>
                </jar>
 
                <jar jarfile="${dist.dir}/${projectName}.jar" basedir="${build.dir}">
                        <exclude name="external-libs.jar" />
                        <zipfileset src="${external}">
                                <exclude name="META-INF/*.SF" />
                        </zipfileset>
                        <manifest>
                                <attribute name="Main-Class" value="${main-class}" />
                                <attribute name="Class-Path" value="${classpath.name}" />
                        </manifest>
                </jar>
 
        </target>
        
```        

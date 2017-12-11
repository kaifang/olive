//Below is an example of lexical scoping, which describes how a parser resolves variable names when functions are nested. 
//The word "lexical" refers to the fact that lexical scoping uses the location where a variable is declared to determine where that variable is available. 
//Nested functions have access to variables declared in their outer scope.
function init() {
    var name = 'World'; // a local variable created by init
    function displayName() { // displayName() is the inner function, a closure
        console.log('Hello' + name); // use variable declared in the parent function    
    }
    displayName();    
}
init();  //prints "HelloWorld"

//Below is the same, but an example of closure.
//A closure is the combination of a function and the lexical environment within which that function was declared.
//Kai: closure is when an inner function has access to its outer enclosing function's variables. 
//Closures can be used for things like implementing privacy and creating function factories.

function funcFactory() {
    var name = 'Kai';
    function displayName() {
        console.log('Hello' + name);
    }
    return displayName;  //the different is that the displayName() inner function is returned from the outer function before being executed.
  }
  
  var myFunc = funcFactory();
  myFunc();  //prints "HelloKai"

//another example of closure (a function returns a function)
function html_text(tag){
    function inner(text) {
      console.log('<' + tag + '>' + text + '<' + tag + '>')
     }
    return inner;
  }
  
 var print_h1 = html_text('h1');
  print_h1('Hello world!');
  print_h1('Another Headline!');

var print_p = html_text('p');
  print_p('This is a paragraph.');


//Below code emonstrates a classic JavaScript closure problem. 
//Reference to the i variable is being stored in the click handler closure, rather than the actual value of i.
for(var i = 1; i < 6; i++) {
   // document.getElementById('my-element' + i)
    //  .addEventListener('click', function() { alert(i) })
}
  
//General workaround is to wrap this in an anonymous function and pass i as argument. 

//Such issues can also be avoided now by using let instead var as shown below.
for(let i = 1; i < 6; i++) {
  //document.getElementById('my-element' + i)
   // .addEventListener('click', function() { alert(i) })
} 


/* closure pattern vs class pattern
1.The closure pattern is more lintable than the class pattern.
2.The class pattern tends to perform better than the closure pattern.
3.The class pattern is more monkey-patchable than the the closure pattern.

the ‘closure pattern’ is also sometimes called the ‘factory class pattern’
*/

//using a while loop 
function factorial(num)  
{  
    // If the number is less than 0, reject it.  
    if (num < 0) {  
        return -1;  
    }  
    // If the number is 0, its factorial is 1.  
    else if (num == 0) {  
        return 1;  
    }  
    var tmp = num;  
    while (num-- > 2) {  
        tmp *= num;  
    }  
    return tmp;  
}  

const result = factorial(8); 
// Output: 40320  
console.log(result);

//using recursion
function fact2(num)  
{  
    // If the number is less than 0, reject it.  
    if (num < 0) {  
        return -1;  
    }  
    // If the number is 0, its factorial is 1.  
    else if (num == 0) {  
        return 1;  
    }  
    // Otherwise, call this recursive procedure again.  
    else {  
        return (num * fact2(num - 1));  
    }  
}  

const result2 = fact2(8); 
console.log(result2);

//one line, arrow function
const fact3 = (x) => x ? x * fact3(x - 1) : 1;
const result3 = fact3(8); 
console.log(result3);

//or
const fact4 = (x, acum = 1) => x ? fact4(x - 1, x * acum) : acum;
const result4 = fact4(8); 
console.log(result4);
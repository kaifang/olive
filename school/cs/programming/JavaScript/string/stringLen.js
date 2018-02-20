const test1 = '100101';  //2
const test2 = '1110010101000010';  //4
const test3 = '001111000111001110000'; //3
const test4 = '1111000'; //0
const test5 = '1'; //0
const test6 = '11'; //0
const test7 = '0'; //0
const test8 = '01'; //0
const test9 = '0011'; //0


const target = '0';

function countZero(str) {
    console.log(str);

    let head = -1;
    let count = 0;
    let maxCount = 0;

    head = str.indexOf('1');
    if (head < 0 || (head +2) >= str.length) {
        return maxCount;
    }
    //while (head <= str.length)
    for (let i = head + 1; i < str.length; i++) {
        if (str.charAt(i) == '1') {
            if (count > 0) {
                if (count > maxCount) {
                    maxCount = count;
                }
                count = 0;
            }
            head = i;
            continue;
        } else if (str.charAt(i) == target) {
            count++;
            continue;
        } else {
            throw 'test string contains invalid char';
        }
    }

    return maxCount;

}

console.log('-->',countZero(test1));
console.log('-->',countZero(test2));
console.log('-->',countZero(test3));
console.log('-->',countZero(test4));
console.log('-->',countZero(test5));
console.log('-->',countZero(test6));
console.log('-->',countZero(test7));
console.log('-->',countZero(test8));
console.log('-->',countZero(test9));

function startTime() {
    const today = new Date();

    console.log(today.toLocaleTimeString());
    console.log(today.toUTCString());

    // or using custom format:
    const h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    console.log(h + ':' + m + ':' + s);
    
    if (today < deadline) {
        let t = setTimeout(startTime, 500);
    }
    else {
        console.log('The end.');
        //clearTimeout(t);
    }
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

var timeInSeconds = 2;
var currentTime = Date.parse(new Date());
var deadline = new Date(currentTime + timeInSeconds*1000);
console.log('Current time is:');
startTime();
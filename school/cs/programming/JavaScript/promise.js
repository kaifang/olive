//Calling APIs, downloading files, reading files are among some of the usual async operations.

//Prior to Promise, we use callback. 
function addAsync (num1, num2, callback) {
    // use the famous jQuery getJSON callback API
    return $.getJSON('http://www.example.com', {
        num1: num1,
        num2: num2
    }, callback);
}

addAsync(1, 2, success => {
    // callback
    const result = success; // you get result = 3 here
});

//What if You Want to Perform Subsequent Async Action?
addAsync(1, 2, success => {
    // callback 1
    resultA = success; // you get result = 3 here

    addAsync(resultA, 3, success => {
        // callback 2
        resultB = success; // you get result = 6 here

        addAsync(resultB, 4, success => {
            // callback 3
            resultC = success; // you get result = 10 here

            console.log('total' + resultC);
            console.log(resultA, resultB, resultC);
        });
    });
});
//people refer this as "callback hell"

//Promises come in to rescue

let resultA, resultB, resultC;

// add two numbers remotely 
function addAsync(num1, num2) {
    // use ES6 fetch API, which return a promise
    return fetch(`http://www.example.com?num1=${num1}&num2=${num2}`)
        .then(x => x.json());
}

addAsync(1, 2)
    .then(success => {
        resultA = success;
        return resultA;
    })
    .then(success => addAsync(success, 3))
    .then(success => {
        resultB = success;
        return resultB;
    })
    .then(success => addAsync(success, 4))
    .then(success => {
        resultC = success;
        return resultC;
    })
    .then(success => {
        console.log('total: ' + success)
        console.log(resultA, resultB, resultC)
    });




// Here is how to create a promise:
function myFirstPromise(url) {
    // Create new promise with the Promise() constructor;
    // This has as its argument a function
    // with two parameters, resolve and reject
    return new Promise(function (resolve, reject) {
        // Standard XHR 
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'blob';

        request.onload = function () {
            if (request.status === 200) {
                // If successful, resolve with the request response
                resolve(request.response);
            } else {
                // If fail, reject with a error message
                reject(Error('Image loading has error code:' + request.statusText));
            }
        };
        // in case network error
        request.onerror = function () {
            reject(Error('There was a network error.'));
        };

        request.send();
    });
}

//const body = document.querySelector('body');
//const myImage = new Image();

// Here is how to use this promise:
myFirstPromise('myLittleVader.jpg').then(function (response) {
    // when the promise resolves, with the request.response
    // specified within the resolve() method.
    const imageURL = window.URL.createObjectURL(response);
    //myImage.src = imageURL;
    //body.appendChild(myImage);

    // when the promise is rejected,
    // logs the Error specified with the reject() method.
}, function (Error) {
    console.log(Error);
});

// The above is actually an use case of Promisifying XMLHttpRequest
function get(url) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url);
        //request.responseType = '';

        req.onload = function () {
            if (req.status == 200) {
                resolve(req.response);
            }
            else {
                reject(Error(req.statusText));
            }
        };

        req.onerror = function () {
            reject(Error("Network Error"));
        };

        req.send();
    });
}

/*----------------------------------------
In an ideal world, all asynchronous functions would already return promises. 
Yet some APIs still expect success and/or failure callbacks to be passed in the old way. 
like the above XHR, also the setTimeout() function:

setTimeout(() => saySomething("10 seconds passed"), 10000);

problematic if saySomething fails, nothing catches it.

Best practice is to wrap problematic functions at the lowest possible level, 
and then never call them directly again:

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
wait(10000).then(() => saySomething("10 seconds")).catch(failureCallback);

Since setTimeout doesn't really fail, we left out reject.
---------------------------------------*/


// compare the old way
function old_get(myHttpRequest,url) {
    const ruleDfd = new Deferred(); 
    const isValid = regExpUtil.commonUrl.test(url);
    if (isValid) {
        myHttpRequest.execute('get', 'simpleGetRequestor', [url]).then(function () {
            ruleDfd.resolve(true);
        }, function () {
            ruleDfd.resolve(false);
        });
    } else {
        ruleDfd.resolve(isValid);
    }

    return ruleDfd;
}

//Now let's use it
// 1
get('story.json').then(function (response) {
    console.log("Success!", response);
}, function (error) {
    console.error("Failed!", error);
})

//can also use catch:
get('story.json').then(function(response) {
  console.log("Success!", response);
}).catch(function(error) {
  console.log("Failed!", error);
})
//There's nothing special about catch(), it's just sugar for then(undefined, func)

//The response is JSON, but we're currently receiving it as plain text. 
//We could alter our get function to use the JSON responseType, but we could also solve it in promises land:
// 2
get('story.json').then(function (response) {
    return JSON.parse(response);
}).then(function (response) {
    console.log("Success!", response);
})

//Since JSON.parse() takes a single argument and returns a transformed value, we can make a shortcut:
// 3
get('story.json').then(JSON.parse).then(function (response) {
    console.log("Success!", response);
})

//In fact, we could make a getJSON() function really easily:
function getJSON(url) {
    return get(url).then(JSON.parse);
}

//Use case: Chaining
// Here the async request to story.json gives a set of URLs to chapters, then we request the first of those. 
getJSON('story.json').then(function (story) {
    return getJSON(story.chapterUrls[0]);
}).then(function (chapter1) {
    console.log("Got chapter 1!", chapter1);
})

// Here is the better version:
// We don't download story.json until getChapter is called, 
// but the next times getChapter is called we reuse the story promise, so story.json is only fetched once.
var storyPromise;
function getChapter(i) {
  storyPromise = storyPromise || getJSON('story.json');

  return storyPromise.then(function(story) {
    return getJSON(story.chapterUrls[i]);
  })
}

// and using it is simple:
getChapter(0).then(function(chapter) {
  console.log(chapter);
  return getChapter(1);
}).then(function(chapter) {
  console.log(chapter);
})


//ES6 fat arrow
const isMomHappy = true;
const willIGetNewPhone = new Promise(
    (resolve, reject) => { 
        if (isMomHappy) {
            const phone = {
                brand: 'Samsung',
                color: 'black'
            };
            resolve(phone);
        } else {
            const reason = new Error('mom is not happy');
            reject(reason);
        }

    }
);
// 2nd promise
var showOff = function (phone) {
    return new Promise(
        function (resolve, reject) {
            var message = 'Hey friend, I have a new ' +
                phone.color + ' ' + phone.brand + ' phone';

            resolve(message);
        }
    );
};
// since we didn't call the reject, we can shorten it using Promise.resolve instead.
const showOff = function (phone) {
    const message = 'Hey friend, I have a new ' +
                phone.color + ' ' + phone.brand + ' phone';
    return Promise.resolve(message);
};

// call our promise
const askMom = function () {
    willIGetNewPhone
        .then(showOff)
        .then(fulfilled => console.log(fulfilled)) // fat arrow
        .catch(error => console.log(error.message)); // fat arrow
};

askMom();

//ES7 introduce async and await syntax. 
//It makes the syntax look prettier without the .then and .catch

// 2nd promise: async returns a promise
async function showOff(phone) {
    return new Promise(
        (resolve, reject) => {
            var message = 'Hey friend, I have a new ' +
                phone.color + ' ' + phone.brand + ' phone';

            resolve(message);
        }
    );
};

// call our promise: await
async function askMom() {
    try {
        console.log('before asking Mom');

        let phone = await willIGetNewPhone;
        let message = await showOff(phone);

        console.log(message);
        console.log('after asking mom');
    }
    catch (error) {
        console.log(error.message);
    }
}

(async () => {
    await askMom();
})();

//Note, we use try { ... } catch(error) { ... } to catch promise error, the rejected promise.

/*

Some key differences between promises and observable are:
- Observables are cancellable
- Observable are lazy

*/
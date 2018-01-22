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

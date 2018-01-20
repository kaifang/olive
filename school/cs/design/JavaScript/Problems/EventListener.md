JavaScript is **single threaded**, meaning that two bits of script cannot run at the same time; they have to run one after another. 

You've probably used events and callbacks to get around this. Here is what addEventListener do:

```
var img1 = document.querySelector('.img-1');

img1.addEventListener('load', function() {
  // image loaded, proceed to next step
});

img1.addEventListener('error', function() {
  // everything's broken
});
```

Unfortunately, in the example above, it's possible that the **events happened before we started listening** for them, 
so we need to work around that using the "complete" property of images:

```
var img1 = document.querySelector('.img-1');

function nextStep() {
  // image loaded, proceed to next step
}

if (img1.complete) {
  nextStep();
}
else {
  img1.addEventListener('load', nextStep);
}

img1.addEventListener('error', function() {
  // everything's broken
});
```

This doesn't catch images that error'd before we got a chance to listen for them.

This is what promises do. If HTML image elements had a "ready" method that returned a promise, we could do this:

```
img1.ready().then(function() {
  // Success
}, function() {
  // Failed
});
```

You can also use catch():
```
//There's nothing special about catch(), it's just sugar for then(undefined, func)

img1.ready().then(function(response) {
  console.log("Success!", response);
}).catch(function(error) {
  console.log("Failed!", error);
})

```

promises are a bit like event listeners except:

1. A promise can only succeed or fail once. It cannot succeed or fail twice, 
neither can it switch from success to failure or vice versa.
2. If a promise has succeeded or failed and you later add a success/failure callback, the correct **callback will be called, 
even though the event took place earlier**.

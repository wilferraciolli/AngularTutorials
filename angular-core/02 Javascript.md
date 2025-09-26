## Javascript

Javascript is a high level programming language used for web applications. It is the only language web browsers can interpret.
it offers dynamic typing which means variables do not hold type and any value can be assigned to it.

As of JS6, classes have been introduced to help new comers to the language since it is becoming more common to use JS as a backend language.
The addition of classes do not make JS an OOP language, it is purely to improve the syntax. Before JS6, the way to create a class and methods would be by using the prototype
```js
// defining a class
function MyClass(var1, anotherVar) {
  this.var1 = var1;
  this.anotherVar = anotherVar;
}

// defining a method within a class
MyClass.prototype.var1.methodName = function() {
  // function logic here
}

// OR
const person = {
  functionName: function() {
    //logic here
  }
}

const personObject = Object.create(person);
personObject.functionName();
```

### Functions
In JS functions are treated as properties, so both properties and functions can be assigned to variables. Functions can be passed around as arguments or even as a return type.
```js
// declaring a function as a variable
const myFunction = function(value){
  return `Value passed in is ${value}`
}

log(myFunction('Some Value'));

// function as parameter
functionOne() {
  // do something
}
functionTwo() {
  //do something
}
// pass a function as parameter by just ommiting the brackets
functionOne(functionTwo);

// function as return type
functionThree(arg) {
  return function (arg2) {
    return arg1 + arg2;
  }
}
```

## Closure
A closure is a famous Javascript feature, it allow a function's access to variable outside of its scope. 
It works by when a function is created, it gets the context of where it was created, then it is passed around by reference hence it is still have access to the scope it was created even after it execution.
Example of closure on inner and outter functions
```js
function outerFunction (x){
  // variable on scope
  let outerVariable = x;
  
  function innerFunction(y){
    console.log(outervariable + y);
  }
  
  return innerFunction;
}

// usage
const myClosure = oterFunction(10);
myClosure(5); // this will print 15
```

Example with multiple closures
```js
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

// usage - each function will have its own reference to the multiplier value
const double = createMultiplier(2);
const triple  = createMultiplier(3);
const quadruple = createMultiplier(4);

console.log(double(5));       // 10
console.log(triple (5));      // 15
console.log(quadruple(10));   // 20

```

Closure to be used within event handlers
```js
function setUpButtonHandler() {
  const buttons = document.querySelectorAll('.counter-btn');

  buttons.forEach((button, index) => {
    let clickCount = 0;

    button.addEventListener('click', function() {
      clickCount++;
      button.textcontent = `Clicked ${ clickCount } times`;
    });
  });
}
// on the above, each function will have its own variable of clickCount within its scope
```
Closures can be complicated to work with as if if the local variables are array and they are used to create more functions, then the same variable will be shared
to every function created rather than each function created have its own instance of the variable.
There are ways to bypass it by using let instead of constants as it will force the variable to pertence to the scope itself, or to use the bind function

## Callback
Callbacks were used in JS to allow the execution of the program without the need to wait for an operation to complete, it would start an async code execution and would run a callback once it was done.
This was very useful to mimic multithread code within a single thread application.
Callbacks were really hard to code and understand and on complex tasks it given the name of Callback Hell especially when try and catch needed to be handled.
Eg
```js
function loadUserProfile(userId, callback) {
  getUserById(userId, function(error, user) {
    if (error) {
      callback(error);
      return;
    }

    getPostsByUserId(user.id, function(error, posts) {
      if (error) {
        callback(error);
        return;
      }

      getCommenstForPosts(posts, function(error, comments) {
      if (error){
        callback(error);
        return;
      }
      
      // once all the data was sequentially resolved and no errors, then return the callback
      callback(null, {
        user: user,
        posts: posts,
        comments: comments
      })
      });
    });
  });
}
```

Promises were created to resolve the callback hell issue, however it can still be hard to interpret. (see next section)


## Promises
A promise is a way to work with async tasks on a single thread application (JS) and perform sequential operation without the need to use callbacks, 
it is a wrapper object that will execute in parallel and return either the value of the promise or a reject in case of a failure. 
Promises have the state of pending, fulfiled and rejected.
The basics of a promise
```js
const promise = new Promise((resolve, reject) => {
  if (someLogic) {
    resolve('value');
  }

  reject('error');
});

promise
  .then((value) => console.log('promised resolved'))
  .catch(error => console.log('error'));
```
Promises can be chained together which would always return another promise to its next `then` handler (note that this is the same as the callback hell if needs to handle error for each next promise)
```js
fetch(`api/users/${userId}`)
  .then(response => response.json())
  .then(user => fetch(`api/posts/${user.id}`))
  .then(response => resonponse.json())
  .then(posts => console.log(posts))
  .catch(error => console.log('error'))
```

### Promises - Async Await
Async await was added to JS to allow asynchronous tasks to be handle synchronous, this is useful when the code flow is dependant on previous ran code.
For the example above, it was required to async fetch the user and then when it was resolved, it would fire another http request to fetch the user posts
then it was mapped so it could be used.
By having async await, it is possible to write better code and handle it on each async operation. Eg the example below shows handling each request individually so easier to manage errors. Ps note that the await keyword means that the app will stop there until the promise is resolved
```js
async function printUserPosts(userId) {
  try {
    const userResponse = await fetch(`api/users/${ userId }`);
    const user = await response.json();
  } catch (error) {
    console.log('Failed to resolve user');
    throw error;
  }
  
  try {
    const userPostsResponse = await fetch(`api/posts/${userId}`);
    const userPosts = await userPostsResponse.json();
    
    console.log(userPosts);
  } catch (error) {
    console.log('Failed to get user posts');
    throw error;
  }
}
```

Promises can also be bashed together to improve performance, `Promise.all` allows to concurrently fire many actions and it will resolve once all of them have either resolved or rejected.
If any of the promises reject, then the whole returned promise will be rejected
```js
async function fetchMultipleUsers() {
  const [user1, user2, user3] = await Promise.all([
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
  ]);
  
  console/log('Fetched 3 users and returned all of them');
}
```

## Event Loop
Javascript is a single threaded language, therefore it uses its own mechanism to manage async tasks called Event Loop so the browser is never stuck waiting on expensive operations.
Event Loop mechanism is formed by 
* Call Stack (All the functions that are being called are put in here) - LIFO
* Web API (Web browser and Node JS APIs) - setTimeOut(), fetch()...
* Micro queue - then(), catch(), finally()... 
* Macro queue - setInterval

The event loop combines everything together. The javascript code is read line by line from top to bottom, the synchronous code will 
be put straight away onto the Call Stack and it will be executed. Thenfor any async code, it will be put either on the Macro or Micro queues which will be dealt with later via callbacks.
The Event loop will always execute in the following order `Call Stack - Micro queue, Macro queue`. Regardless of which one was called first.
Eg
```js
  console.log('1- START');

  setTimeOut(()=>{
    console.log('2- Macrotask');
  }, 0);
  
  Promise.resolve().then(()=> {
    console.log('3- Microtask');
  });

  queueMicrotask(() => console.log('4- Microtask'));
  
  console.log('5- END');
  
  // The code above will print in the following order
  // 1- START
  // 5- END
  // 3- Microtask
  // 4- Microtask
  // 2- Macrotask
```

















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
A promise is a way to work with async tasks on a single thread application (JS) and perform sequential operation without the need to use callbacks, it is a wrapper object that will execute in paralel and return either the value of the promise or a reject in case of a failure

## Async Await






















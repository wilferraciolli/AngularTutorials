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

### Closure
## Closure
























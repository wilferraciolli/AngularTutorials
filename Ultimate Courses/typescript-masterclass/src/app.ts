class MyClass {
  myMethod() {
    const foo = '123';

    console.log('1', this); // the keyword this in here is for the class

    setTimeout(function () {
      console.log(this); // the keyword this in here is pointing to the class and not the function
    }, 0);

    setTimeout(() => {
      console.log(this); // the keyword this in here is pointing to the function scope rather than the class
    }, 0);
  }
}

const myInstance = new MyClass();
myInstance.myMethod();

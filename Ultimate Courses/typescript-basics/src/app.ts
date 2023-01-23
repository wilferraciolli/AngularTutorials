// To run this class type in tcs to Compile the TS file, then node dist/app.js to run the transliped file


// Adding default value for optional parameters
function multiply(a: number, b: number = 25) {
  return a * b;
}

// console.log(multiply(5));

// --------------------------------------------------------------------------------------------------------------------------//
const pizza = {
  name: 'Pepperoni',
  price: 15,
  getName() {
    return this.name;
  }
  // the above is the same as the below
  // getName: function() {
  //   return this.name;
  // }
};

const toppings = ['pepperoni'];

// shorthand syntax of creating a property based on the name of the parameter Eg below the first fiels is actually pizza: 'pizza'
const order = {
  pizza,
  toppings
};

// @ts-ignore
function createOrder(pizza, toppings) {
  return { pizza, toppings };
}

//console.log(pizza.getName());


// --------------------------------------------------------------------------------------------------------------------------//
// REST parameter - Allow passing arguments to a single variable (this is normally the ...)
// @ts-ignore
function sumAll(message, ...arr) {
  // console.log('The arguments for this function are: ', arguments);
  // console.log('The first argument of the function is: ', message);
  // @ts-ignore
  return arr.reduce((prev, next) => prev + next);
};

const sum = sumAll('Message', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// console.log(sum);


// --------------------------------------------------------------------------------------------------------------------------//
// Array spread operators

const oldToppings = ['bacon', 'chilli'];

const newToppings = ['pepperoni'];

const allToppings = [...oldToppings, ...newToppings]; // create a new object and concat both arrays onto one


// console.log(allToppings);

/* ----------------------------------------------------------------------------- */
// Object Spread operator
const pizza1 = {
  name: 'Pepperoni'
};

const toppings1 = ['pepperoni'];

// create a new object without referencing the source  objects, this will create a new object
const order1 = {
  ...pizza1, toppings1
};

// another way to assign object
const order2 = Object.assign({}, pizza1, { toppings1 });

// another way to assign object
const spreadOperator = { ...pizza1, toppings1 };

// another way to add
// console.log(order1);
// console.log(order2);
// console.log(spreadOperator);


/* ----------------------------------------------------------------------------- */
// Destructuring arrays and objects
const pizza5 = {
  name: 'Pepperoni',
  toppings: ['pepperoni']
};

// @ts-ignore
function orderPizza({ name: pizzaName, toppings: pizzaToppings }) {
  return { pizzaName, pizzaToppings };
}

// destruct an object and only get a single variable
const { pizzaName } = orderPizza(pizza5);

//console.log(pizzaName);

// Array destruction
const toppings5 = ['pepperoni', 'bacon', 'chilli'];
const [first, second, third] = toppings5;

console.log(first, second, third);

// this function will take an array and convert onto a string
function logToppings([first, second, third]: any){
  console.log(first, second, third);
}

logToppings(toppings5)








//********************************** any types ********************************
//let coupon: any; // Avoid as maximum the any type, it is also the default value for properties

// coupon = 25;
//coupon = 'pizza25';
//coupon = true;

// console.log(coupon);

//********************************** implicity vs explicity types ********************************
let implicitCoupon = 'pizza25'; // implicit because TS infers the type based on the assignement - probably only use for const
let explicitCoupon: string = 'pizza25'; // explicit because we have statically assigne the type - allow typescript to know the type before it is instantiated

//********************************** void types ********************************
let selectedTopping: string = 'pepperoni';

// this is not a pure function as it is mutating values outside its scope
function selectTopping(topping: string): void {
  selectedTopping = topping;
}

selectTopping('bacon');

//console.log(selectedTopping);


//********************************** Never types ********************************
// the never type tell TS that a type will never occur

function orderError(error: string): never {
  throw  new Error(error);
}

try {
  orderError('something went wrong');
} catch {

}


//********************************** Null, undefiened and strict nulls types ********************************
let coupon1: string | null = 'pizza25';

function removeCoupon(): void {
  coupon1 = null; // assigning null or undefined here will cause an error because the value must be a string unless if the type is string or null
}

// console.log(coupon1);

removeCoupon(); // assign to null

// console.log(coupon1);


//********************************** Union and literal types ********************************
let pizzaSize: string = 'small';

function selectSize(size: 'small' | 'medium' | 'large'): void { // litetal type, allows to specify available values
  pizzaSize = size;
}

selectSize('medium');

// console.log(`Pizza size : ${pizzaSize}`);


//********************************** Function types ********************************
// create different types

// first way to create function
function sumOrder(price: number, quantity: number): number {
  return price * quantity;
}

// second way to create function
let sumOrderFunction: Function;
sumOrderFunction = (price: number, quantity: number) => price * quantity;

// third way to create function
let sumOrder1: (price: number, quantity: number) => number;
sumOrder1 = (x, y): number => x * y;

const sumTotal = sumOrder1(25, 2);
// console.log(`Total sum: ${ sumTotal }`);


//********************************** Function optional/default parameters ********************************
let totalSumOrder: (price: number, quantity?: number) => number;

totalSumOrder = (x, y = 1) => {
  return x * y; // the value of y is optional so the default value will be used instead
};

// console.log(`Total sum: ${ totalSumOrder(25) }`);
// console.log(`Total sum: ${ totalSumOrder(25, 2) }`);


//********************************** Object types ********************************
let pizza3: { name: string, price: number, foo?: string, getName(): string };

// create an object with optional properties
pizza3 = {
  name: 'Plain old pepperoni',
  price: 20,
  getName(): string {
    return pizza3.name;
  }
};

// console.log(pizza3.getName());


//********************************** Array and Generics types ********************************
let sizes: string[];
sizes = ['small', 'medium', 'large'];

let toppings3: Array<string>;
toppings3 = ['pepperoni', 'tomato', 'bacon'];


//********************************** Tuple types ********************************
// Tuples are used when dealing with multiple types, this defines a strict set of values, this needs to have the correct order

let pizza4: [string, number, boolean]; // Creating a tuple
pizza4 = ['Pepperoni', 20, true];















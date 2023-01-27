// To run this file first run "tsc" to compile the file, then "node dis/primitives.js" this will run the js file on the console

//---------------------------------------------- numbers --------------------------------------
const pizzaCost: number = 10;
const pizzaToppings: number = 5;


function calculateCost(cost: number, toppings: number): number {
  return cost + 1.5 * toppings;
}

const cost = calculateCost(pizzaCost, pizzaToppings);

//console.log(`Pizza costs: ${cost}`);

parseInt('15', 10); // parse and integer using base 10


//---------------------------------------------- strings --------------------------------------
const coupon: string = 'pizza25';

function normalizeCoupon(code: string): string {
  return code.toUpperCase();
}


const couponMessage: string = `Final coupon is ${ normalizeCoupon(coupon) }`;

// console.log(couponMessage);


/* -----------------------------------  Boolean    ------------------------------------------ */
const pizzas: number = 5;

function offerDiscount(orders: number): boolean {
  return orders >= 3;
}

if (offerDiscount(pizzas)){
  console.log(`You are entitle to a discount`);
} else {
  console.log(`Order more than 3 pizzas for a discount`);
}





















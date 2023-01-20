const pizzas = [
  { name: 'Pepperoni', toppings: ['pepperoni'] }
];

// const mappedPizzas = pizzas.map((pizza) => {
//   return pizza.name.toUpperCase();
// });
// the above was converted to this
const mappedPizzas = pizzas.map(pizza =>  pizza.name.toUpperCase());
// console.log(mappedPizzas);

const pizza = {
  name: 'Blazing inferno',
  getName: () => pizza.name
};

console.log(pizza.getName());





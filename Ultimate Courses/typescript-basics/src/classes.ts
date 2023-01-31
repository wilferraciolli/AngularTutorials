// Typescript way of creating classes
class Pizza12 {
  public name: string;
  public toppings: string[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public addTopping(topping: string): void {
    this.toppings.push(topping);
  }
}

const pizza12 = new Pizza12('Pepperoni');
pizza12.addTopping('pepperoni');
// console.log(pizza12);

// Javascript way of creating classes
function Pizza11(name: string) {
  this.name = name;
  this.toppings = [];
}

Pizza11.prototype.addTopping = function addTopping(topping: string) {
  this.toppings.push(topping);
};
const pizza11 = new Pizza11('Pepperoni');
pizza11.addTopping('pepperoni');
// console.log(pizza11);

//*************** getters and setters ****************
class Sizes12 {
  constructor(public sizes: string[]) {
  }

  set availableSizes(sizes: string[]) {
    this.sizes = sizes;
  }

  get availableSizes(){
    return this.sizes;
  }
}

// Getters and setters are called without the brackets
const sizes11 = new Sizes12(['small', 'medium']);
// console.log(sizes11.availableSizes); // getter
sizes11.availableSizes = ['medium', 'large'];
// console.log(sizes11.availableSizes); // getter after setting the value


//******************************** inheritance ******************************
class Pizza15 extends Sizes12 {
  name: string;

  constructor(name: string, sizes: string[]) {
    super(sizes);
  }
}

const pizza15 = new Pizza15('Pepperoni', ['small', 'medium']);
// check inheritance
pizza15.availableSizes = ['large'];
// console.log(pizza15);


//************************ static properties and methods **************
class Coupon {
  static allowed = ['Pepperoni', 'Blazing Inferno'];

  static create(percentage: number): string {
    return `PIZZA_RESTAURANT_${percentage}`;
  }
}

console.log(Coupon.allowed); // does not need to be instantiated
console.log(Coupon.create(20)); // does not need to be instantiated
console.log(Date.now()); // does not need to be instantiated




























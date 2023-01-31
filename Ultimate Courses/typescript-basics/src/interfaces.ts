interface Sizes {
  sizes: string[]
}

interface Pizza10 extends Sizes{
  name: string,
  toppings?: number,
  getAvailableSizes(): string[],
  [key: number]: string // create a dictionary for the interface - this is used for look up
}


let pizza10: Pizza10;

function createPizza(name: string, sizes: string[]): Pizza10 {
  return {
    name,
    sizes,
    getAvailableSizes() {
      return this.sizes;
    }
  }
}

pizza10 = createPizza('Pepperoni', ['small', 'medium']);
pizza10.toppings = 1;
pizza10[1] = 'xyz'; // assign and id to the pizza













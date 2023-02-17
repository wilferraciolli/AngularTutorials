class Pizza {
  constructor(private name: string, private price: number) {
  }
}

// // a list that will take anything, however generics can specify a type when instantiated
// class List {
//   list: any[];
//
//   addItem(item: any): void {
//     this.list.push(item);
//   }
//
//   getList(): any[] {
//     return this.list;
//   }
// }

//generics can specify a type when instantiated
class List<T> {
  private list: T[];

  addItem(item: any): void {
    this.list.push(item);
  }

  getList(): T[] {
    return this.list;
  }
}


const list = new List<Pizza>();
list.addItem(new Pizza('Pepperoni', 15));
list.addItem(new Pizza('Pepperoni', 15));

const pizzas = list.getList();


class Coupon {
  constructor(private name: string) {
  }
}
const anotherList = new List<Coupon>();
anotherList.addItem(new Coupon('Coupon'));

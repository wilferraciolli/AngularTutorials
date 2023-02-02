interface Person {
  name: string;
  age?: number;
  address: {};
}

// this is not needed as typescript can do it - this is jsut a function to pass an object, then says that the second argument must be a key of the object
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};


// Allows to pick which properties we want to pick from an object
const person: MyPick<Person, 'name' | 'age'> = {
  name: 'wil',
  age: 37
};






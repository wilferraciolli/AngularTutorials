interface Person {
  name: string;
  age?: number;
}

// this is not needed as typescript can do it
type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};

// method to print a property that is optional ** but we wanted to make it required
function printAge(person: MyRequired<Person>) {
  return `${ person.name } is ${ person.age }`;
}

const person:  MyRequired<Person> = {
  name: 'wil',
  age: 37
};

const ager = printAge(person);





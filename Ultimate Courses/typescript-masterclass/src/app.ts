interface Person {
  name: string;
  age: number;
}

// this is not needed as typescript can create an object Readonly<Person>
interface ReadOnlyPerson {
  readonly name: string;
  readonly age: number;
}

// mutable person
const person: Person = {
  name: 'Wil',
  age: 27
};

type MyReadOnly<T> = {
  // manual way of looping through properties and mark them as read only
  readonly [P in keyof T]: T[P];
};


// function to get a mutable object, then create a new object of same type and properties but with ReadOnly properties
function freezeObject<T>(objectToMakeReadOnly: T): MyReadOnly<T> {
  //  this method will take an object, then loop through all its propertyu and create a new object with Read only properties
  return Object.freeze(objectToMakeReadOnly);
}

const immurablePerson = freezeObject(person);



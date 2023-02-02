// create an anonymus type
const person = {
  name: 'Wil',
  age: 37
};

// type query
type Person = typeof person; // type of, will give an interface of an object

// The below is getting the keys of a property, then the below is getting the type of each key, this can be used to look up objects
type PersonKeys = keyof Person; // union type [ name | age ], this will give the key names of the properties
type PersonTypes = Person[PersonKeys]; // union type [ string | number ], this will give the type of each key

// using generics to work out types on the fly, this will use keyof to work out the properties name durinf compile,
// so typescript can know the value of each key before compiling, enforcing type safe
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

// this method will work as this is a type sage look up type since we are declatring the key of
const personName = getProperty(person, 'name');
const personAge = getProperty(person, 'age');
// const personAge = getProperty(person, 'unknownProperty'); // this wont compile because 'unknownProperty is not typeof person'






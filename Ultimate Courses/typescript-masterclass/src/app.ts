interface Person {
  name: string;
  age: number;
}

// this is not needed as typescript can create an object Partial<Person>
interface PartialPerson {
  name?: string;
  age?: number;
}

const person: Person = {
  name: 'Wil',
  age: 27
};

type MyPartial<T> = {
  // manual way of looping through properties and mark them as optional
  readonly [P in keyof T]?: T[P];
};

function updatePerson(person: Person, prop: MyPartial<Person>) {
  return { ...person, ...prop };
}

updatePerson(person, { name: 'NewName' });



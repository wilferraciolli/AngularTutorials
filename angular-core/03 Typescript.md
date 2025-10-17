## Typescript

Typescript is a superset of Javascript. It was created by Microsoft to make it easier to write large applications because TS brings in
types, classes and interfaces which allows code to be typed check during compile time.

Typescript is transpiled to Javascript via a transpiler which will convert the code ontoplain Javascript and has great support for old version of JS.
Many frameworks are written in TS and have addapted it as its own language Eg Angular, React...
It is proven to help large applications to be easier to maitain the code and less prone to bugs due to its strictness on type checking.

Typescript syntax is as follows:
`let varName: type;`
`funtionName(param: paramType): returnType { }`
`funtion name(param: paramType): returnType { }`

Typescript types are:

- string
- number
- boolean
- any (only used to disable type checking - use inknown instead)
- void
- null
- undefined
- never
- object
  It also has structured types such as Arrays and Maps.
  `items: string[] = ['a', 'b', 'c'];`
-

It allows union types `let type: string | number;`

### Typescript Objects, interfaces and Types

```ts
interface Person {
  name: string;
  age: number;

  isMinor(): boolean;
}

type ID = string | number;
let userId: ID = 123;

interface Employee extends Person {
  department: string;
}
```

#### Classes and OOP

Classes are used to create objects in Typescript. They can have its own variables and methods. It supports inheritance, polymorphism and have access modifies Eg public protected, private....

```ts
class Animal {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  protected getName(): string {
    return this.name;
  }

  public move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }

  protected bark() {
    console.log('Woof! Woof!');
  }
}
```

Abstract classes

```ts
abstract class Shape {
  abstract area(): number;
}

class Circle extends Shape {
  area() {
    return Math.PI * this.radius * this.radius;
  }
}
```

### Generics

Generics are very popular within OOP as it allows code to be reusable.

```ts
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>('myString');

interface GenericArray<T> {
  items: T[];
}

let intArray: GenericArray<number> = {items: [1, 2, 3]};
let strArray: GenericArray<string> = {items: ['a', 'b', 'c']};
```

### Namespace
namespace is used to group related code together.

```ts
namespace Utils {
  export function log(message: string) {
    console.log(message);
  }
}

// can be used same as static methods in Java
Uils.log('Message to log');
```

### Enums
enum can be uses to group constants together.
```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

let direction: Direction = Direction.Up;
```
`
### Decorators
decorators are used to add metadata to classes, methods, properties, parameters, etc.
```ts
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(target, propertyKey, descriptor);
}

class Example {
  @log
  public method() {
    console.log('Method called');
  }
}
```

### Type guards
Type guards are used to check the type of a variable.
```ts
function isString(value: any): value is string {
  return typeof value === 'string';
}

let value: number | string = 'hello';
if (isString(value)) {
  console.log(value.length);
}
```

### Error handling and Async
try and catch is another famous OOP concept, it works well with async code. Both function sbelow are async
1 is using async-await pattert for promises, and the other is using RXJS observables which uses the publish/subscribe pattern
```ts
async function fetchData(): Promise<Response> {
  try {
    let response = await fetch('https://example.com');
    let data = await response.json();
    
    return data;
  } catch (error) {
    console.log('Error fetching data', error);
  }
}

getData(): Observable<Response> {
  return this.http.get('https://example.com')
    .pipe(
      catchError(error => {
        console.log('Error fetching data', error);
        return of(null);
      })
    );
}
```











// function overload *******************************


// just declare function to allow JS compiler to know what the parameters the function will take
function reverse(str: string): string;
// just declare function
function reverse<T>(arr: T[]): T[];
// implementation of the function based on the declarations above
function reverse<T>(stringOrArray: string | T[]): string | T[] {
  if (typeof stringOrArray === 'string') {
    return stringOrArray
    .split('')
    .reverse()
    .join('');
  }

  // call the reverse just to be able to return a new array
  return stringOrArray.slice().reverse();
}

reverse('Pepperoni');
reverse(['bacon', 'pepperoni', 'chili', 'mushrooms']);

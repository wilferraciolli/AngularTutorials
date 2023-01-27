//************************************* type alias *********************************
type Size = 'small' | 'medium' | 'large'; // define an object as type, this will be an alias which them can be used elsewhere
type Callback = (size: Size) => void;

let pizzaSize1: Size = 'small';

const selectSize1: Callback = (x) => { // type alias
  pizzaSize1 = x;
};

selectSize1('small');
selectSize1('medium');
selectSize1('large');


//************************************* type assertions *********************************
type Pizza = { name: string, toppings: number };

const pizza6: Pizza = { name: 'Blazing inferno', toppings: 5 };

//to check if the type is correct, we can parse onto an object to check it
const serialized = JSON.stringify(pizza6);

function getNameFromJSONOldWay(obj: string): string {
  // convert from string onto an object (OLD WAY)
  return (<Pizza>JSON.parse(obj)).name;
}

function getNameFromJSONNewWay(obj: string): string {
  // convert from string onto an object (OLD WAY)
  return (JSON.parse(obj) as Pizza).name;
}

getNameFromJSONOldWay(serialized);
getNameFromJSONNewWay(serialized);





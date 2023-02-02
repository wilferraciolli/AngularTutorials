const elem = document.querySelector('.click');

// syntax for typescript to allow the 'this' keyword to be infered, the first argument of the function is still the event: Event
function handleClick(this: HTMLAnchorElement, event: Event) {
  event.preventDefault();

  // need to specify the argument type to resolve this
  console.log(this.href);
}

elem.addEventListener('click', handleClick, false);

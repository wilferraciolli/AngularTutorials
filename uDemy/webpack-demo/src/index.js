import _ from 'lodash';
import './style.css';
import Icon from'./icon.png';

function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  // add icon
  const myIcon = new Image();
  myIcon.src = Icon;

  element.append(myIcon);

  return element;
}

document.body.appendChild(component());

function log() {
  console.log(anythign);
}

function openMenu(e) {
  // call animation
  e.classList.toggle("change");

  // display navigation menu
  let navigation = document.getElementsByClassName('navigation')[0];
  navigation.style.display = "block";
}

function onLoad() {
  document.querySelectorAll('.postInteraction').forEach(function (element) {
    let span = element.querySelector('span')
    let score = span.textContent;

    let buttons = element.querySelectorAll('button'),
      thumbsUp = buttons[0],
      thumbsDown = buttons[1];

    thumbsUp.addEventListener('click', function (element) {
      score++;
      thumbsDown.disabled = false;
      if (score == 10) {
        thumbsUp.disabled = true;
      }

      console.log('score', score);
      span.textContent = score;
    });

    thumbsDown.addEventListener('click', function (el) {
      score--;
      thumbsUp.disabled = false;

      if (score == 0) {
        thumbsDown.disabled = true;
      }

      console.log('score', score);
      span.textContent = score;
    });
  });
}

/*
 Add click events to buttons
 if thumbsUp clicked increment up to 10
 if thumbsDown clicked decrement to 0

 update/store count
 */

onLoad();

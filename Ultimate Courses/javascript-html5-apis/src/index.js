import '../assets/css/style.css';

const app = document.getElementById('app');
app.innerHTML = `
  <h1>JavaScript HTML5 APIs</h1>
  <div >
  &#127916
  </div>
  
  <style>
  </style>
`;

const init = async () => {
  // console.log('Browser supports Notifications');
  const permission = await Notification.requestPermission();

  switch (permission) {
    case 'granted': {
      console.log('Permission granted');
      break;
    }
    case 'denied': {
      console.log('Permission denied');
      break;
    }
    default: {
      console.log('Permission was not granted or denied');
    }
  }

  const showNotification = () => {
    const notification = notify(`&#127909; Now playing`, 'Song name');

    if (notification) {
      notification.addEventListener('click', (e) => {
        window.parent.focus(); // opens the tab where the notification was created
        e.target.close();
      });
    }
  };

  setTimeout(showNotification, 2000);
};

const notify = (title, body) => {
  if (Notification.permission === 'granted') {
    return new Notification(title, {
      body,
      icon: 'https://i.imgur.com/2Qs6HQp.png'
    });
  }

  return null;
};

// check if browser supports notifications
if ('Notification' in window) {
  init();
}



import '../assets/css/style.css';

const app = document.getElementById('app');
app.innerHTML = `
  <h1>JavaScript HTML5 APIs</h1>
  <div class="uploader">
<!-- Set the element to allow drag -->
    <div class="dragme" draggable="true"></div>
    <div class="dropzone">Drag here!</div>
  </div>
  
  <style>
  .uploader {
     box-sizing: border-box;
    max-width: 90%;
    border-radius: 10px;
    border-bottom: 3px solid #d2d5da;
    margin: 25px auto;
    padding: 25px;
    background: #fff;
  }
  .dragme {
    background: #ce1f99;
    border-radius: 5px;
    width: 50px;
    height: 50px;
  }

  .dropzone {
    border-radius: 5px;
    margin-top: 25px;
    padding: 25px;
    border: 2px dashed #d2d5da;
    background: #f1f2f5;
  }
  </style>
`;


const init = () => {};

// check if browser supports drag and drop
if ('draggable' in document.createElement('div')) {
  init();
}

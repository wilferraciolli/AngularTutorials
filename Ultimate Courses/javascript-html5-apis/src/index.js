import '../assets/css/style.css';

const app = document.getElementById('app');
app.innerHTML = `
  <h1>JavaScript HTML5 APIs</h1>
  <div class="uploader">
<!-- Set the element to allow drag -->
<!--    <div id="item-0" class="dragme" draggable="true"></div>-->
    <h2>Upload your files &#128209</h2>
    <div class="dropzone">&#128194; target Drag here!</div>
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
  
  .active {
    background: #ebfff6;
    border-color: #24b373;
  }
  </style>
`;


const init = () => {
  // const dragme = document.querySelector('.dragme');
  //
  // dragme.addEventListener('dragstart', (e) => {
  //   // console.log(e.dataTransfer);
  //   // console.log(e.target.id); // print the id attribute
  //   e.dataTransfer.setData('text/plain', e.target.id);
  // });


  // **************** drop zone *************************
  const dropzone = document.querySelector('.dropzone');

  // add event on drag enter
  dropzone.addEventListener('dragenter', (e) => {
    // console.log(e, 'dragenter');
    e.target.classList.add('active');
  });

  // add event on drag leave
  dropzone.addEventListener('dragleave', (e) => {
    // console.log(e, 'dragleave');
    e.target.classList.remove('active');
  });

  // add event on drag over - this will be firing as long as it is on top of a drop zone
  dropzone.addEventListener('dragover', (e) =>{
    // console.log(e, 'dragging over');
    e.preventDefault();
    e.stopImmediatePropagation();

    // change the cursor when dropping over
    e.dataTransfer.dropEffect = 'copy';
  });

  // add the drop event
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    e.target.classList.remove('active');
    // console.log('Dropping');

    // // get the data from the dropped item, then get the element by id and move it
    // console.log(e.dataTransfer.getData('text/plain'), 'data from dropped item');
    // const id = e.dataTransfer.getData('text/plain');
    // const element = document.getElementById(id);
    // dropzone.append(element); // add the element to the dropzone

    // manage files dropped
    const { files } = e.dataTransfer;
    console.log(files);
  });

  // allow to drop anywhere on the screen and add it to the dropzone, this is to prevent the browser from defaulting behaviour when dropping outside the drop zone
  document.addEventListener('dargover', (e) => e.preventDefault());
  document.addEventListener('drop', (e) => e.preventDefault());
};

// check if browser supports drag and drop
if ('draggable' in document.createElement('div')) {
  init();
}

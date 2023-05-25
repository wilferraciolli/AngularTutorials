import '../assets/css/style.css';

const app = document.getElementById('app');
app.innerHTML = `
  <h1>JavaScript HTML5 APIs</h1>
  <div class="uploader">
<!-- Set the element to allow drag -->
<!--    <div id="item-0" class="dragme" draggable="true"></div>-->
    <h2>Upload your files &#128209</h2>
    <p>Accepts only .png, .jpeg, .svg</p>
    <input type="file" class="files" accept="image/*" multiple>
    <div class="dropzone">&#128194; target Drag here!</div>
    <div class="list"></div>
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
  const files = document.querySelector('.files');
  const list = document.querySelector('.list');

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
  dropzone.addEventListener('dragover', (e) => {
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
    handleFileUpload(files);
  });

  // add event listener for file input field
  files.addEventListener('change', (e) => {
    // manage files picked by the input form
    const { files } = e.target;
    handleFileUpload(files);
  });

  const showPreviewFile = (file) => {
    const reader = new FileReader();
    // console.log(reader);
    reader.readAsDataURL(file); // read the file and convert onto Base64
    reader.addEventListener('load', (e) => {
      // get target base 64 for preview
      const div = document.createElement('div');
      // console.log(file); // print the actual file

      // create the preview for the file so it can be appended to the DOM
      div.innerHTML = `
        <div style="display: flex">
          <img 
            src="${ e.target.result }"
            alt="${ file.name }"
            style="width: 20px; margin-right: 10px;"
            > 
            <p>${ file.name } <span>${ file.size } bytes</span></p>
        </div> 
      `;
      list.append(div); // add the preview image to the DOM
    });
  };

  const uploadFiles = async (files) => {
    const form = new FormData();
    [...files].forEach((file) => form.append(file.name, file)); // add each file to the form data array so it can be
                                                                // uploaded

    // console.log([...form.entries()]); // get the array values of the form and their data

    // upload the files to the following project https://glitch.com/edit/#!/dragdropfiles
    const request = await fetch('//dragdropfiles.glitch.me/upload', {
      method: 'POST',
      body: form
    });

    return await request.json();
  };

  const isAllowedType = (file) => {
    return ['image/png', 'image/jpeg', 'image/svg+xml'].includes(file.type);
  };

  const handleFileUpload = async (files) => {
    if (Array.from(files).filter(isAllowedType).length !== files.length) {
      console.log('There was bad files passed in, handle error');
    }

    // filter accepted files type
    const filteredFiles = Array.from(files).filter(isAllowedType);
    filteredFiles.forEach(showPreviewFile);

    // upload the files to the test server
    const uploaded = await uploadFiles(filteredFiles);

    if (uploaded) {
      for (const image of uploaded.images) {
        console.log('Uploaded to the following URL', image);
      }
    }
  };

  // allow to drop anywhere on the screen and add it to the dropzone, this is to prevent the browser from defaulting
  // behaviour when dropping outside the drop zone
  document.addEventListener('dargover', (e) => e.preventDefault());
  document.addEventListener('drop', (e) => e.preventDefault());
};

// check if browser supports drag and drop
if ('draggable' in document.createElement('div')) {
  init();
}

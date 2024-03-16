import {renderGallery} from './thumbnails.js';
import {setOnFormSubmit, closeImgUploadForm} from './form.js';
import {getData, sendData} from './api.js';
import {showAlert} from './util.js';
import {showSuccessMessage, showErrorMessage} from './message.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeImgUploadForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  renderGallery(data);
} catch(err) {
  showAlert(err.message);
}


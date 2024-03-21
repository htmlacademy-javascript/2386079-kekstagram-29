import {renderGallery} from './thumbnails.js';
import {setOnFormSubmit, closeImgUploadForm} from './form.js';
import {getData, sendData} from './api.js';
import {debounce, showAlert} from './util.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import {setEffectSlider} from './effects.js';
import {init, getSortedPictures} from './sorting.js';

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
  const debouncedRenderGallery = debounce(renderGallery());
  init(data, debouncedRenderGallery());
  renderGallery(getSortedPictures());
} catch(err) {
  showAlert(err.message);
}

setEffectSlider();

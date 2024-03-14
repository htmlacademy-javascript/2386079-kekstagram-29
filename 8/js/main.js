import {createPhotos} from './data.js';
import {renderGallery} from './thumbnails.js';
import './form.js';
import './image-scale.js';
import {setEffectSlider} from './effects.js';

const photos = createPhotos();

renderGallery(photos);
setEffectSlider();


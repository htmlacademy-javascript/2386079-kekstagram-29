import {createPhotos} from './data.js';
import {renderGallery} from './thumbnails.js';
import './form.js';
import './image-scale.js';
import './effects.js';

const photos = createPhotos();

renderGallery(photos);


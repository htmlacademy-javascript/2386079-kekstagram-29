import {createPhotos} from './data.js';
import {renderGallery} from './thumbnails.js';
import './form.js';

const photos = createPhotos();

renderGallery(photos);

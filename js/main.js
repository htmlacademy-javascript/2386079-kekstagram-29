import {createPhotos} from './data.js';
import {renderGallery} from './thumbnails.js';

const photos = createPhotos();

renderGallery(photos);

import {createPhotos} from './data.js';
import {renderThumbnails} from './thumbnails.js';
import {renderGallery} from './thumbnails.js';

const photos = createPhotos();

renderThumbnails(photos);
renderGallery(photos);


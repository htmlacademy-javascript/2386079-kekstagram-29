import {createPhotos} from './data.js';
const photos = createPhotos();
// eslint-disable-next-line no-console
console.log(photos);

import {renderPhotos} from './miniatures';
renderPhotos();

export {photos};

import {createPhotos} from './data.js';

const photos = createPhotos();

const picturesContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('a');

for (let i = 0; i < photos.length; i++) {
  const picture = template.cloneNode(true);
  const pictureImage = template.querySelector('.picture__img');
  pictureImage.src = photos[i].url;
  pictureImage.alt = photos[i].description;
  const pictureLikes = template.querySelector('.picture__likes');
  pictureLikes. textContent = photos[i].likes;
  const pictureComments = template.querySelector('.picture__comments');
  pictureComments.textContent = photos[i].comments.length;
  fragment.append(picture);
}

picturesContainer.appendChild(fragment);

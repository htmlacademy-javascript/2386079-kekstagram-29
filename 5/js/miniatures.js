import {photos} from './main.js';

const picturesContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const renderPhotos = function () {
  const picture = photoTemplate.cloneNode(true);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < photos.length; i++) {
    const pictureImage = picture.querySelector('.picture__img');
    pictureImage.src = photos[i].url;
    pictureImage.alt = photos[i].description;
    const pictureLikes = picture.querySelector('.picture__likes');
    pictureLikes.textContent = photos[i].likes;
    const pictureComments = picture.querySelector('.picture__comments');
    pictureComments.textContent = photos[i].comments.length;
    fragment.append(picture);
  }
  picturesContainer.append(fragment);
};

export {renderPhotos};

import {openBigPicture, closeBigPicture} from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const getThumbnail = ({comments, description, likes, url, id}) => {
  const thumbnail = photoTemplate.cloneNode(true);
  const imageElement = thumbnail.querySelector('.picture__img');
  imageElement.src = url;
  imageElement.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};
const renderThumbnails = (photos, container) => {
  container.querySelectorAll('.picture').forEach((element) => element.remove);
  const fragment = document.createDocumentFragment();
  for (const photo of photos) {
    const thumbnail = getThumbnail(photo);
    fragment.append(thumbnail);
  }
  container.append(fragment);
};

const closeBigPictureButton = document.querySelector('.big-picture__cancel');
closeBigPictureButton.addEventListener('click', () => {
  closeBigPicture();
});

let pictures = [];
const onContainerClick = (evt) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');
  if (!thumbnail) {
    return;
  }
  evt.preventDefault();
  const picture = pictures.find(
    (item) => item.id === +thumbnail.dataset.thumbnailId
  );
  openBigPicture(picture);
};

const renderGallery = (currentPictures) => {
  pictures = currentPictures;
  renderThumbnails(pictures, picturesContainer);
  picturesContainer.addEventListener('click', onContainerClick);
};

export {renderThumbnails, renderGallery};

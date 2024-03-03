const picturesContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const getPhotoElement = ({comments, description, likes, url}) => {
  const photoElement = photoTemplate.cloneNode(true);
  const imageElement = photoElement.querySelector('.picture__img');
  imageElement.src = url;
  imageElement.alt = description;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  return photoElement;
};
const renderPhotos = (photos) => {
  const fragment = document.createDocumentFragment();
  for (const photo of photos) {
    const photoElement = getPhotoElement(photo);
    fragment.append(photoElement);
  }
  picturesContainer.append(fragment);
};

export {renderPhotos};

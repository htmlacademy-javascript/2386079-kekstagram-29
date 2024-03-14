const Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  DEFAULT: 100
};

const imgUploadModal = document.querySelector('.img-upload');
const zoomInButton = imgUploadModal.querySelector('.scale__control--bigger');
const zoomOutButton = imgUploadModal.querySelector('.scale__control--smaller');
const scaleInput = imgUploadModal.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadModal.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imgUploadPreview.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onZoomInButtonClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  const newValue = currentValue + Scale.STEP;
  if (newValue <= Scale.MAX) {
    scaleImage(newValue);
  }
};

const onZoomOutButtonClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  const newValue = currentValue - Scale.STEP;
  if (newValue >= Scale.MIN) {
    scaleImage(newValue);
  }
};

const resetScale = () => scaleImage(Scale.DEFAULT);

zoomInButton.addEventListener('click', onZoomInButtonClick);
zoomOutButton.addEventListener('click', onZoomOutButtonClick);

export {resetScale};

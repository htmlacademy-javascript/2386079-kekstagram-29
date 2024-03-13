const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const SCALE_STEP = 25;

const imgUploadModal = document.querySelector('.img-upload');
const zoomInButton = imgUploadModal.querySelector('.scale__control--bigger');
const zoomOutButton = imgUploadModal.querySelector('.scale__control--smaller');
const scaleInput = imgUploadModal.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadModal.querySelector('.img-upload__preview');

const scaleImage = (value) => {
  imgUploadPreview.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onZoomInButtonClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  const newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    scaleImage(MAX_SCALE);
  } else {
    scaleImage(newValue);
  }
};

const onZoomOutButtonClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  const newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    scaleImage(MIN_SCALE);
  } else {
    scaleImage(newValue);
  }
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

zoomInButton.addEventListener('click', onZoomInButtonClick);
zoomOutButton.addEventListener('click', onZoomOutButtonClick);

export {resetScale};

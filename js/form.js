import {isEscapeKey} from './util.js';
import {resetScale} from './image-scale.js';
import {resetEffects} from './effects.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хештэгов`,
  NOT_UNIQUE: 'Хештэги повторяются',
  INVALID_PATTERN: 'Неправильный хештэг'
};

const SubmitButtonText = {
  INACTIVE: 'Опубликовать',
  SUBMITTING: 'Отправляю...'
};

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const hashtagField = imgUploadForm.querySelector('.text__hashtags');
const commentField = imgUploadForm.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});
const openImgUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('.modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};
const closeImgUploadForm = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('.modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  pristine.reset();
  resetScale();
  resetEffects();
};

imgUploadInput.addEventListener('change', () => {
  openImgUploadForm();
});

imgUploadCancel.addEventListener('click', () => {
  closeImgUploadForm();
});

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? SubmitButtonText.SUBMITTING
    : SubmitButtonText.INACTIVE;
};

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));
const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;
const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(hashtagField, hasUniqueTags, ErrorText.NOT_UNIQUE);
pristine.addValidator(hashtagField, hasValidCount, ErrorText.INVALID_COUNT);
pristine.addValidator(hashtagField, hasValidTags, ErrorText.INVALID_PATTERN);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const isTextFieldFocused = () =>
  document.activeElement === hashtagField || document.activeElement === commentField;
const isErrorMessageShown = () => Boolean(document.querySelector('.error'));

const setOnFormSubmit = (callback) => {
  imgUploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      toggleSubmitButton(true);
      await callback(new FormData(imgUploadForm));
      toggleSubmitButton();
    }
  });
};

function onDocumentKeydown (evt){
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isErrorMessageShown()) {
    evt.preventDefault();
    closeImgUploadForm();
  }
}

export {closeImgUploadForm, setOnFormSubmit};

import {isEscapeKey} from './util.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1-19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хештэгов`,
  NOT_UNIQUE: 'Хештэги повторяются',
  INVALID_PATTERN: 'Неправильный хештэг'
};

const imgUploadForm = document.querySelector('.img-upload');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const hashtagField = imgUploadForm.querySelector('.text__hashtags');

const openImgUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('.modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeImgUploadForm = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('.modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgUploadForm();
  }
}
imgUploadInput.addEventListener('change', () => {
  openImgUploadForm();
});

imgUploadCancel.addEventListener('click', () => {
  closeImgUploadForm();
});

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const normalizeTags = (tagString) => tagString
  .trim()
  .split (' ')
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

import {isEscapeKey} from './util.js';

const COMMENTS_PER_PORTION = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsShownCount = bigPicture.querySelector('.comments-shown-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const caption = bigPicture.querySelector('.social__caption');
const commentList = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');

let commentsShown = 0;
let comments = [];
const createComment = ({avatar, name, message}) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};
const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION;
  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsShown.classList.remove('hidden');
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }
  commentList.innerHTML = '';
  commentList.append(fragment);
  commentsShownCount.textContent = commentsShown;
  commentsCount.textContent = comments.length;
};

const renderBigPicture = ({url, likes, description}) => {
  bigPictureImage.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  caption.textContent = description;
};
const openBigPicture = (data) => {
  bigPicture.classList.remove('hidden');

  document.body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  renderBigPicture(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
};
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
};

const onCancelButtonClick = () => closeBigPicture();
const onCommentsLoaderClick = () => renderComments();

function onDocumentKeydown (evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

cancelButton.addEventListener('click', onCancelButtonClick);
commentsLoader.addEventListener('click', onCommentsLoaderClick);

export {openBigPicture, closeBigPicture};

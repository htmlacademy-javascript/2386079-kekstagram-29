import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const caption = bigPicture.querySelector('.social__caption');
const commentList = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const renderBigPicture = ({comments, url, likes, description}) => {
  bigPictureImage.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  caption.textContent = description;
};
const createComment = ({avatar, name, message}) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  commentList.innerHTML = '';
  const fragment = document.createDocumentFragment();
  for (const item of comments) {
    const comment = createComment(item);
    fragment.append(comment);
  }
  commentList.append(fragment);
};

const openBigPicture = (data) => {
  bigPicture.classList.remove('hidden');

  document.body.classList.add('modal-open');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  renderBigPicture(data);
  renderComments(data.comments);
};
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

export {openBigPicture, closeBigPicture};

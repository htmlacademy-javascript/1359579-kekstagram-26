import {isEscapeKey} from './utils.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureElement = document.querySelector('.big-picture__img img');
const cancelElement = bigPicture.querySelector('.big-picture__cancel');
const commentCount = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const captionElement = bigPicture.querySelector('.social__caption');
const commentsList = document.querySelector('.social__comments');
const templateComment = document.querySelector('.social__comment');
const loadedCommentsCount = bigPicture.querySelector('.loaded-comments-count');
const likesCountElement = bigPicture.querySelector('.likes-count');
const COMMENTS_LIMIT = 5;
let commentOffset;
let renderCommentsHandler;

function renderComment(comments) {
  const comentsListFragment = document.createDocumentFragment();

  loadedCommentsCount.textContent = Math.min(comments.length, commentOffset + COMMENTS_LIMIT);
  comments.slice(commentOffset, commentOffset + COMMENTS_LIMIT).forEach(({avatar, name, message}) => {
    const elementComment = templateComment.cloneNode(true);
    elementComment.querySelector('.social__picture').src = avatar;
    elementComment.querySelector('.social__picture').alt = name;
    elementComment.querySelector('.social__text').textContent = message;
    comentsListFragment.appendChild(elementComment);
  });

  commentsList.appendChild(comentsListFragment);

  if (commentOffset + COMMENTS_LIMIT >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
}

const renderMoreComments = (comments) => {
  commentOffset += COMMENTS_LIMIT;
  renderComment(comments);
};

function keydownEscapeHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', keydownEscapeHandler);
    cancelElement.removeEventListener('click', clickHandler);
    commentsLoader.removeEventListener('click', renderCommentsHandler);
  }
}

function clickHandler() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  cancelElement.removeEventListener('click', clickHandler);
  document.removeEventListener('keydown', keydownEscapeHandler);
  commentsLoader.removeEventListener('click', renderCommentsHandler);
}

function renderBigPicture(url, likes, comments, description) {
  bigPicture.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  bigPictureElement.src = url;
  likesCountElement.textContent = likes;
  commentCount.textContent = comments.length;
  captionElement.textContent = description;
  document.querySelectorAll('.social__comment').forEach((item) => item.remove());
  commentOffset = 0;
  renderComment(comments);
  body.classList.add('modal-open');
  document.addEventListener('keydown', keydownEscapeHandler);
  cancelElement.addEventListener('click', clickHandler);
  renderCommentsHandler = () => renderMoreComments(comments);
  commentsLoader.addEventListener('click', renderCommentsHandler);
}

export {renderBigPicture};

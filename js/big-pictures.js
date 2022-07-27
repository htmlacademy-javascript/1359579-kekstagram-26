import {isEscapeKey} from './utils.js';

const COMMENTS_LIMIT = 5;

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const comentsList = document.querySelector('.social__comments');
const templateComment = document.querySelector('.social__comment');
const commentCount = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const loadedCommentsCount = bigPicture.querySelector('.loaded-comments-count');
const captionElement = bigPicture.querySelector('.social__caption');
const bigPictureElement = document.querySelector('.big-picture__img img');
const cancelElement = bigPicture.querySelector('.big-picture__cancel');
const likesCountElement = bigPicture.querySelector('.likes-count');
let commentOffset;

function renderComment(comments) {
  document.querySelectorAll('.social__comment').forEach((item) => item.remove());
  const comentsListFragment = document.createDocumentFragment();

  loadedCommentsCount.textContent = Math.min(comments.length, commentOffset + COMMENTS_LIMIT);
  comments.slice(commentOffset, commentOffset + COMMENTS_LIMIT).forEach(({avatar, name, message}) => {
    const elementComment = templateComment.cloneNode(true);
    elementComment.querySelector('.social__picture').src = avatar;
    elementComment.querySelector('.social__picture').alt = name;
    elementComment.querySelector('.social__text').textContent = message;
    comentsListFragment.appendChild(elementComment);
  });

  comentsList.appendChild(comentsListFragment);

  if (commentOffset + COMMENTS_LIMIT >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
}

const renderMoreComments = (comments) => {
  commentOffset += COMMENTS_LIMIT;
  renderComment(comments);
};

const keydownEscapeHandler = (evt) =>  {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', keydownEscapeHandler);
  }
};

function clickHandler() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  cancelElement.removeEventListener('click', clickHandler);
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

  // commentsCountElement.classList.add('hidden');
  // commentsLoaderElement.classList.add('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', keydownEscapeHandler);
  cancelElement.addEventListener('click', clickHandler);
  commentsLoader.addEventListener('click', () => renderMoreComments(comments));
}

export {renderBigPicture};

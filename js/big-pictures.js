const MAX_RENDER_COMMENTS = 5;

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const comentsList = document.querySelector('.social__comments');
const commentCountElement = bigPicture.querySelector('.social__comment-count');
const templateComment = document.querySelector('.social__comment');
const captionElement = bigPicture.querySelector('.social__caption');

const bigPictureElement = document.querySelector('.big-picture__img img');
const cancelElement = bigPicture.querySelector('.big-picture__cancel');
const likesCountElement = bigPicture.querySelector('.likes-count');
const commentsCountElement = bigPicture.querySelector('.comments-count');
const commentsLoaderElement = bigPicture.querySelector('.comments-loader');

function renderComment(comments) {
  document.querySelectorAll('.social__comment').forEach((item) => item.remove());
  const comentsListFragment = document.createDocumentFragment();

  comments.slice(0, MAX_RENDER_COMMENTS).forEach(({avatar, name, message}) => {
    const elementComment = templateComment.cloneNode(true);
    elementComment.querySelector('.social__picture').src = avatar;
    elementComment.querySelector('.social__picture').alt = name;
    elementComment.querySelector('.social__text').textContent = message;
    comentsListFragment.appendChild(elementComment);
  });

  comentsList.appendChild(comentsListFragment);
}

function keydownEscapeHandler(event) {
  if (event.key === 'Escape') {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', keydownEscapeHandler);
  }
}

function clickHandler() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  cancelElement.removeEventListener('click', clickHandler);
}

function renderBigPicture(url, likes, comments, description) {
  bigPicture.classList.remove('hidden');
  bigPictureElement.src = url;
  likesCountElement.textContent = likes;
  commentCountElement.textContent = comments.length;
  captionElement.textContent = description;
  renderComment(comments);

  commentsCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', keydownEscapeHandler);
  cancelElement.addEventListener('click', clickHandler);
}

export {renderBigPicture};

import {getCards} from './data.js';
import {renderBigPicture} from './big-pictures.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

/**
 * @param {Number} likes - количество лайков
 * @param {Number} url - адрес изображения
 * @param {String} comments - количество комментариев
 * @param {String} description - описание изображения
 */

function renderPictures(pictures) {
  pictures.forEach(({likes, url, comments, description}) => {
    const elementPicture = pictureTemplate.cloneNode(true);
    elementPicture.querySelector('.picture__likes').textContent = likes;
    elementPicture.querySelector('.picture__img').src = url;
    elementPicture.querySelector('.picture__comments').textContent = comments.length;
    elementPicture.addEventListener('click', () => renderBigPicture(url, likes, comments, description));
    picturesFragment.appendChild(elementPicture);
  });
  picturesList.appendChild(picturesFragment);
}

renderPictures(getCards());

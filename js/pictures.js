import {getCards} from './data.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const getPictures = getCards();
const picturesFragment = document.createDocumentFragment();

/**
 * @param {Number} likes - количество лайков
 * @param {Number} url - адрес изображения
 * @param {String} comments - количество комментариев
 */

getPictures.forEach(({likes, url, comments}) => {
  const elementPicture = pictureTemplate.cloneNode(true);
  elementPicture.querySelector('.picture__likes').textContent = likes;
  elementPicture.querySelector('.picture__img').src = url;
  elementPicture.querySelector('.picture__comments').textContent = comments.length;
  picturesFragment.appendChild(elementPicture);
});

picturesList.appendChild(picturesFragment);

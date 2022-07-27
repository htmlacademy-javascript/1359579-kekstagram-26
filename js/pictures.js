import {renderBigPicture} from './big-pictures.js';
import {getData} from './api.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

/**
 * @param {Number} likes - количество лайков
 * @param {Number} url - адрес изображения
 * @param {String} comments - количество комментариев
 * @param {String} description - описание изображения
 */

const renderPictures = (pictures) => {
  const listPicturesFragment = document.createDocumentFragment();
  pictures.forEach(({likes, url, comments, description}) => {
    const elementPicture = pictureTemplate.cloneNode(true);
    elementPicture.querySelector('.picture__likes').textContent = likes;
    elementPicture.querySelector('.picture__img').src = url;
    elementPicture.querySelector('.picture__comments').textContent = comments.length;
    elementPicture.addEventListener('click', () => {
      renderBigPicture(url, likes, comments, description);
    });
    listPicturesFragment.appendChild(elementPicture);
  });
  picturesList.appendChild(listPicturesFragment);
};

getData(renderPictures);

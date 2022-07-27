import {renderBigPicture} from './big-pictures.js';
import {getData} from './api.js';
import {showAlert, getRandomElements, debounce} from './utils.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');
const filterDefault = document.querySelector('#filter-default');
const filterRandomElement = document.querySelector('#filter-random');
const filterDiscussedElement = document.querySelector('#filter-discussed');
const RECYCLING_DELAY = 500;
const COUNT = 10;
let defaultPictures;
let sortedPictures;

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

const clearPictures = () => picturesList.querySelectorAll('.picture').forEach((item) => item.remove());

const clearActiveFilterButton = () => imgFiltersForm.forEach(
  (item) => item.classList.remove('img-filters__button--active'));

const filterClick = (evt) => {
  if (evt.target.nodeName === 'BUTTON') {
    clearPictures();
    let pictures;
    let filterElement;
    if (evt.target.id === 'filter-default') {
      pictures = defaultPictures;
      filterElement = filterDefault;
    } else if (evt.target.id === 'filter-random') {
      const randomIndexes = getRandomElements(defaultPictures.map((item) => item.id), COUNT);
      pictures = randomIndexes.map((id) => defaultPictures[id]);
      filterElement = filterRandomElement;
    } else if (evt.target.id === 'filter-discussed') {
      if (!sortedPictures) {
        const sortedIndexes = defaultPictures
          .map((item) => ({id: item.id, commentCount: item.comments.length}))
          .sort((a, b) => b.commentCount - a.commentCount);
        sortedPictures = sortedIndexes.map((item) => defaultPictures[item.id]);
      }
      pictures = sortedPictures;
      filterElement = filterDiscussedElement;
    }
    renderPictures(pictures);
    clearActiveFilterButton();
    filterElement.classList.add('img-filters__button--active');
  }
};
imgFiltersForm.addEventListener('click', debounce(filterClick, RECYCLING_DELAY));

const showFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.classList.add('img-filters--active');
};

getData(
  (pictures) => {
    defaultPictures = pictures;
    showFilters();
    renderPictures(defaultPictures);
  },
  () => showAlert('Ошибка соединения с сервером. Попробуйте ещё раз.'),
);


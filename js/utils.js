const arrayIds = [];
const MIN_ITEM_ID = 1;
const MAX_ITEM_ID = 1000000000;
const TIME_WARNING = 5000;


function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random()*(upper - lower + 1) + lower;
  return Math.floor(result);
}

/* Функция генерации случайного элемента из массива */

function getRandomElement(elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

/* Рандомная генерация Id */

function getRandomArrayId() {
  const randomItemId = getRandomPositiveInteger(MIN_ITEM_ID, MAX_ITEM_ID);
  if (arrayIds.includes(randomItemId)) {
    return getRandomArrayId();
  } else {
    arrayIds.push(randomItemId);
    return randomItemId;
  }
}

const isEscapeKey = function(evt) {
  return evt.key === 'Escape';
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.position = 'absolute';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.left = '0';
  alertContainer.style.padding = '10px';
  alertContainer.style.fontSize = '18px';
  alertContainer.style.color = '#fffff';
  alertContainer.style.backgroundColor = '#ff4e4e';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.zIndex = '100';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, TIME_WARNING);
};

export {getRandomPositiveInteger, getRandomElement, getRandomArrayId, isEscapeKey, showAlert};


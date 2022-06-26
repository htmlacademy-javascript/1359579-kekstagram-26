import {getRandomPositiveInteger} from './util.js';

const MIN_LIKE_QUANTITY = 15;
const MAX_LIKE_QUANTITY = 200;

function getLikes() {
  return getRandomPositiveInteger(MIN_LIKE_QUANTITY, MAX_LIKE_QUANTITY);
}

export {getLikes};

import {getDescriptions} from './get-descriptions.js';
import {getLikes} from './get-likes.js';
import {getComments} from './get-comments.js';

const CARD_QUANTITY = 25;

function getCards() {
  return Array.from({length: CARD_QUANTITY}, getRandomCard);
}

function getRandomCard(_, index) {
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: getDescriptions(),
    likes: getLikes(),
    comments: getComments(),
  };
}

getCards();

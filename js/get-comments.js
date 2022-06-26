import {getRandomPositiveInteger} from './main.js';
import {getRandomElement} from './main.js';

const messages = [
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const names = [
  'Артем',
  'Катя',
  'Анна',
  'Виктор',
  'Кирилл',
  'Иван',
  'Дарья',
  'Евгения',
];

const MIN_COMMENT_QUANTITY = 1;
const MAX_COMMENT_QUANTITY = 2;

function getComments() {
  return Array.from({length: getRandomPositiveInteger(MIN_COMMENT_QUANTITY, MAX_COMMENT_QUANTITY)}, getRandomComment);
}

const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;

function getRandomComment() {
  return {
    id: getCommentId(),
    avatar: `img/avatar-${getRandomPositiveInteger(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
    message: getRandomElement(messages),
    name: getRandomElement(names),
  };
}

//Последовательная генерация Id:
let lastCommentId = 0;

function getCommentId() {
  lastCommentId += 1;
  return lastCommentId;
}

export {getComments};

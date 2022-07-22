import {getRandomElement, getRandomPositiveInteger} from './utils.js';

const descriptions = [
  'Ахаха, зацени, какой у него маленький объектив!',
  'Потенциальной добычи так много, что можно никуда не торопиться и немного потанцевать.',
  'Жизнь грустная, зато зарплата смешная',
  'Давайте рассмотрим изображение внимательнее',
  'Я считаю, что снимок получился завораживающим',
  'Ничего личного, просто бизнес.',
  'Красиво жить не запретишь.',
  'Только мертвая рыба плывет по течению.',
  'Жизнь коротка. Улыбайтесь, пока у вас еще есть зубы.',
  'Фотография жены в моём бумажнике, напоминает мне о том, что на этом месте могли бы быть деньги…',
  'Невозможно жить полной жизнью на пустой желудок!',
  'Не так страшны корпоративы, как «вас отметили на фото».',
  'Эта жара заставила меня понять, что я не выживу в аду. Пора меняться…',
  'Хорошо там, где меня нет… Но ничего, я и туда доберусь!',
  'Не смотри на надпись, смотри на меня',
  'Профессиональная выдержка',
  'Иногда, когда я закрываю глаза, становится темно.',
  'Я почти уверен, что вы смотрите на мое изображение',
  'Смотреть можно, но трогать нельзя',
];

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

let lastCommentId = 0;

const MIN_COMMENT_QUANTITY = 1;
const MAX_COMMENT_QUANTITY = 2;
const MIN_LIKE_QUANTITY = 15;
const MAX_LIKE_QUANTITY = 200;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const CARD_QUANTITY = 25;

function getComments() {
  return Array.from({length: getRandomPositiveInteger(MIN_COMMENT_QUANTITY, MAX_COMMENT_QUANTITY)}, getRandomComment);
}

function getDescriptions() {
  return getRandomElement(descriptions);
}

function getCommentId() {
  lastCommentId += 1;
  return lastCommentId;
}

function getLikes() {
  return getRandomPositiveInteger(MIN_LIKE_QUANTITY, MAX_LIKE_QUANTITY);
}

function getCards() {
  return Array.from({length: CARD_QUANTITY}, getRandomCard);
}

/**
 * @param {function} getRandomComment - Функция получения рандомного комментария
 * @return {object} - возвращает объект шаблона
 * @param {Number} id - идентификатор
 * @param {String} avatar - url аватара
 * @param {String} message - текст комментария
 */

function getRandomComment() {
  return {
    id: getCommentId(),
    avatar: `img/avatar-${getRandomPositiveInteger(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
    message: getRandomElement(messages),
    name: getRandomElement(names),
  };
}

/**
 * @param {function} getRandomCard - Функция получения рандомной фотографии
 * @return {object} - возвращает объект шаблона
 * @param {Number} id - идентификатор
 * @param {String} url - url фотографии
 * @param {String} description - описание фотографии
 * @param {String} likes - кол-во лайков на фотографии
 * @param {String} comments - комментарии под фотографией
 */

function getRandomCard(index) {
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: getDescriptions(),
    likes: getLikes(),
    comments: getComments(),
  };
}

getCards();

export {getDescriptions, getComments, getLikes};

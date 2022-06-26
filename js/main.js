/* eslint-disable no-unused-vars */
const DESCRIPTION = [
  'Ахаха, зацени, какой у него маленький объектив!',
  'Потенциальной добычи так много, что можно никуда не торопиться и немного потанцевать.',
  'Вы не подскажете, как пройти в библиотеку?',
  'Жизнь грустная, зато зарплата смешная',
  'Давайте рассмотрим изображение внимательнее',
  'Я считаю, что снимок получился завораживающим',
  'Герой нашего времени.',
  'Ничего личного, просто бизнес.',
  'Красиво жить не запретишь.',
  'Когда я просыпаюсь утром.',
  'Только мертвая рыба плывет по течению.',
  'Жизнь коротка. Улыбайтесь, пока у вас еще есть зубы.',
  'Фотография жены в моём бумажнике, напоминает мне о том, что на этом месте могли бы быть деньги…',
  'Невозможно жить полной жизнью на пустой желудок!',
  'Сегодня отличный день — для торта…',
  'Не так страшны корпоративы, как «вас отметили на фото».',
  'Что я чувствую, когда нет Кофе? Депрессо…',
  'Эта жара заставила меня понять, что я не выживу в аду. Пора меняться…',
  'Спорт нужен только для того, чтобы хорошо выглядеть голым.',
  'Хорошо там, где меня нет… Но ничего, я и туда доберусь!',
  'Не смотри на надпись, смотри на меня',
  'Профессиональная выдержка',
  'Иногда, когда я закрываю глаза, становится темно.',
  'Я почти уверен, что вы смотрите на мое изображение',
  'Смотреть можно, но трогать нельзя',
];

const NAMES = [
  'Артем',
  'Катя',
  'Анна',
  'Виктор',
  'Кирилл',
  'Иван',
  'Дарья',
  'Евгения',
];

const LIKES_COUNTER = {
  min: 15,
  max: 200,
};

const COMMENTS_COUNTER = {
  min: 0,
  max: 15,
};

const MESSAGES = [
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const LIKES = getRandomPositiveInteger(15, 200);

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}


function getRandomElement(elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

function getCards() {
  return Array.from({length: 25}, getRandomCard);
}

function getRandomCard(_, index) {
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: getRandomElement(DESCRIPTION),
    likes: getRandomPositiveInteger(15, 200),
    comments: getComments(),
  };
}

function getComments() {
  return Array.from({length: getRandomPositiveInteger(1, 2)}, getRandomComment);
}

function getRandomComment() {
  return {
    id: getCommentId(),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomElement(MESSAGES),
    name: getRandomElement(NAMES),
  };
}


let lastCommentId = 0;

//Последовательная генерацияы Id:
function getCommentId() {
  lastCommentId += 1;
  return lastCommentId;
}

//Рандомная генерация Id:
const commentIds = [];

function getRandomCommentId() {
  const randomCommentId = getRandomPositiveInteger(1, 500);
  if (commentIds.includes(randomCommentId)) {
    return getRandomCommentId();
  } else {
    commentIds.push(randomCommentId);
    return randomCommentId;
  }
}

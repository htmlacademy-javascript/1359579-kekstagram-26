/* eslint-disable no-unused-vars */
/**
 * @param {Number} min - минимальное значение
 * @param {Number} max - максимальное значение
 * @param {Number} num - количество знаков после запятой
 * @return {Number} - случайное число
 */

function getRandomNumber(min, max, num = 0) {
  if (min < 0 || max < 0) {
    return 'Числа не могут быть отрицательными';
  }

  if (min > 0) {
    [min, max] = [max, min];
  }

  // получить случайное число от (min-0.5) до (max+0.5)
  const number = +(min - 0.5 + Math.random() * (max - min + 1)).toFixed(num);
  return(number);
}

getRandomNumber(0.5, 1.5, 3);

function getRandomInteger() {
  return getRandomNumber;
}

getRandomInteger(1, 5);

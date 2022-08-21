import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeFilmDate = (dueDate) => dayjs(dueDate).format('YYYY');
const getCommentDate = (dueDate) => dayjs(dueDate).format('YYYY/MM/DD HH:mm');
const filmRuntime = (minutes) => `${(minutes - (minutes % 60)) / 60}h ${(minutes % 60)}mm`;

export {getRandomInteger, humanizeFilmDate, filmRuntime, getCommentDate};

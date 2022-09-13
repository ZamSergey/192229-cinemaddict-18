import dayjs from 'dayjs';

const humanizeFilmDate = (dueDate) => dayjs(dueDate).format('YYYY');
const getCommentDate = (dueDate) => dayjs(dueDate).format('YYYY/MM/DD HH:mm');
const filmRuntime = (minutes) => `${(minutes - (minutes % 60)) / 60}h ${(minutes % 60)}mm`;

const sortFilmsByDate = (a, b) => {
  if (a.film_info.release.date < b.film_info.release.date) {
    return -1;
  }
  if (a.film_info.release.date > b.film_info.release.date ) {
    return 1;
  }

  return 0;
};

const sortFilmByRating = (a, b) => {
  if (a.film_info.total_rating < b.film_info.total_rating) {
    return 1;
  }
  if (a.film_info.total_rating > b.film_info.total_rating ) {
    return -1;
  }
  // a должно быть равным b
  return 0;
};

export {humanizeFilmDate, filmRuntime, getCommentDate, sortFilmsByDate, sortFilmByRating};

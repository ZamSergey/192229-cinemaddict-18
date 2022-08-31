import dayjs from 'dayjs';

const humanizeFilmDate = (dueDate) => dayjs(dueDate).format('YYYY');
const getCommentDate = (dueDate) => dayjs(dueDate).format('YYYY/MM/DD HH:mm');
const filmRuntime = (minutes) => `${(minutes - (minutes % 60)) / 60}h ${(minutes % 60)}mm`;

export {humanizeFilmDate, filmRuntime, getCommentDate};

import {FilterType} from '../mock/const.js';

const filter = {
  [FilterType.ALL]: (tasks) => tasks,
  [FilterType.WATHLIST]: (tasks) => tasks.filter((task) => task.user_details.watchlist),
  [FilterType.HISTORY]: (tasks) => tasks.filter((task) => task.user_details.already_watched),
  [FilterType.FAVORITES]: (tasks) => tasks.filter((task) => task.user_details.favorite)
};

export {filter};

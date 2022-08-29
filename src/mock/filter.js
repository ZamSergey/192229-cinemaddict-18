import {filter} from '../utils/filter.js';
import {getRandomInteger} from '../utils/common.js';

export const generateFilter = (films) => Object.entries(filter).map(
  ([filterName, filterFilms]) => ({
    name: filterName,
    count: filterFilms(films).length,
    isActive: getRandomInteger(0,1)
  }),
);

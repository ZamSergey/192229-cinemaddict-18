import UserProfile from './view/user-profile.js';
import Filter from './view/filters.js';
import Sort from './view/sort.js';
import ButtonShowMore from './view/button-show-more';


import {render} from './render.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.header');

render(new UserProfile(), siteHeaderElement);
// render(new Filter(), siteMainElement);
// render(new Sort(), siteMainElement);


// render(new Sort(), siteMainElement);

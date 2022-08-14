import UserProfile from './view/user-profile.js';
import Filter from './view/filters.js';
import Sort from './view/sort.js';
import FilmDetailsPopUp from './view/film-details-pop-up.js';
import FilmMainPresenter from '../presenter/film-main-presenter.js';


import {render} from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteBodyElement = document.querySelector('body');
// siteBodyElement.classList.add('film-details');
const filmMainPresenter = new FilmMainPresenter();

render(new UserProfile(),siteHeaderElement);
render(new Filter(), siteMainElement);
render(new Sort(), siteMainElement);
render(new FilmDetailsPopUp(), siteBodyElement);

filmMainPresenter.init(siteMainElement);

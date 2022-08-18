import UserProfile from './view/user-profile.js';

import FilmDetailsPopUp from './view/film-details-pop-up.js';
import FilmMainPresenter from '../presenter/film-main-presenter.js';
import FilmDetailPresenter from '../presenter/film-detail-presenter.js';
import FilmsModel from './model/films-model.js';
import FilmDetailModel from './model/films-detail-model.js';


import {render} from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteBodyElement = document.querySelector('body');
// siteBodyElement.classList.add('film-details');
const filmMainPresenter = new FilmMainPresenter();
const filmDetailPresenter = new FilmDetailPresenter();
const filmsModel = new FilmsModel();
const filmDetailModel = new FilmDetailModel();

render(new UserProfile(),siteHeaderElement);
// render(new FilmDetailsPopUp(), siteBodyElement);

filmMainPresenter.init(siteMainElement, filmsModel);
filmDetailPresenter.init(siteBodyElement, filmDetailModel);

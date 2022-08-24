import UserProfile from './view/user-profile.js';
import FilmMainPresenter from '../presenter/film-main-presenter.js';

import FilmsModel from './model/films-model.js';
import FilmDetailModel from './model/films-detail-model.js';
import FilmDetailPresenter from '../presenter/film-detail-presenter.js';
import {render} from './render.js';

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = siteBodyElement.querySelector('.header');
// siteBodyElement.classList.add('film-details');
const filmMainPresenter = new FilmMainPresenter();
// const filmDetailPresenter = new FilmDetailPresenter();
const filmsModel = new FilmsModel();
// const filmDetailModel = new FilmDetailModel();

render(new UserProfile(),siteHeaderElement);

filmMainPresenter.init(siteBodyElement, filmsModel);


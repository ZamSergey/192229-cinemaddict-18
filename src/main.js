import UserProfile from './view/user-profile.js';
import FilmMainPresenter from '../presenter/film-main-presenter.js';

import FilmsModel from './model/films-model.js';
import {render} from './render.js';

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const filmsModel = new FilmsModel();

const filmMainPresenter = new FilmMainPresenter(siteBodyElement, filmsModel);


render(new UserProfile(),siteHeaderElement);

filmMainPresenter.init();

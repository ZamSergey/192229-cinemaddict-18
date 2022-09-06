import FilmListContainer from '../src/view/film-list-container.js';
import FilmList from '../src/view/film-list.js';
import ButtonShowMore from '../src/view/button-show-more.js';
import FilmListEmpty from '../src/view/list-empty-view';
import FilmContainer from '../src/view/film-container.js';
import {render, remove} from '../src/framework/render.js';
import Filter from '../src/view/filters';
import Sort from '../src/view/sort';
import FilmDetailPresenter from './film-detail-presenter';
import FilmPresenter from './film-presenter';
import FilmDetailModel from "../src/model/films-detail-model";
import {generateFilter} from '../src/mock/filter';
import {updateItem} from '../src/utils/common';

const FILM_COUNT_PER_STEP = 5;

export default class FilmMainPresenter {

  #filmDetailPresenter = new FilmDetailPresenter();
  #filmPresenter = new Map();

  #filmComponent = new FilmContainer();
  #filmListComponent = new FilmList();
  #filmListContainerComponent = new FilmListContainer();
  #filmFilterComponent = null;
  #filmSortComponent = new Sort();
  #buttonShowMoreComponent = null;

  #filmMainContainer = null;
  #filmsModel = null;
  #filmsList = [];
  #filmBodyContainer = null;
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  constructor(filmMainContainer, filmsModel) {
    this.#filmBodyContainer = filmMainContainer;
    this.#filmMainContainer = filmMainContainer.querySelector('.main');
    this.#filmsModel = filmsModel;
  }

  init = () => {
    //Получаем данные о фильмах
    this.#filmsList = [... this.#filmsModel.films];

    //Навигация(Филтры)
    const filterData = generateFilter(this.#filmsList);


    this.#filmFilterComponent = new Filter(filterData);


    render(this.#filmFilterComponent, this.#filmMainContainer);


    if (this.#filmsList.length == 0) {
      this.#renderNoFilms();
    } else {
      this.#renderFilmList()
    }

  };

  #renderFilm = (filmData) => {
    const film = new FilmPresenter(this.#filmListContainerComponent.element, this.#handleFilmChange);
    film.init(filmData, this.#filmDetailPresenter);
    this.#filmPresenter.set(filmData.id, film);
  }

  #renderFilmList = () => {
    render(this.#filmSortComponent, this.#filmMainContainer);
    render(this.#filmComponent, this.#filmMainContainer);
    render(this.#filmListComponent,this.#filmComponent.element);
    render(this.#filmListContainerComponent,this.#filmListComponent.element);
    //Отрисовка контейнера для карточек фильмов
    // render(this.#filmListContainerComponent,this.#filmListComponent.element);

    for (let i = 0; i < Math.min(this.#filmsList.length, FILM_COUNT_PER_STEP); i++) {
      this.#renderFilm(this.#filmsList[i]);
    }

    if (this.#filmsList.length > FILM_COUNT_PER_STEP) {
      this.#renderButtonShowMore();
      this.#buttonShowMoreComponent.element.addEventListener('click', this.#handleLoadMoreButtonClick);
    }
  }

  #clearFilmList = () => {
    this.#filmPresenter.forEach((film) => {film.destroy()});
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#buttonShowMoreComponent)
  }

  #handleFilmChange = (updatedFilm) => {
    this.#filmsList = updateItem(this.#filmsList, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  };

  #renderButtonShowMore = () => {
    this.#buttonShowMoreComponent = new ButtonShowMore();
    render(this.#buttonShowMoreComponent, this.#filmListComponent.element);
  }

  #renderNoFilms = () => {
    render(this.#filmComponent, this.#filmMainContainer);
    render(this.#filmListComponent,this.#filmComponent.element);
    render(new FilmListEmpty(), this.#filmListComponent.element);
  }

  #handleLoadMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.#filmsList
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#filmsList.length) {
      this.#buttonShowMoreComponent.element.remove();
      this.#buttonShowMoreComponent.removeElement();
    }
  };

}

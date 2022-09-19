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
import {sortFilmsByDate, sortFilmByRating} from '../src/utils/date.js';
import {SortType} from '../src/mock/const.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmMainPresenter {

  #filmDetailPresenter = null;
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
  #sourcedFilmsList = [];

  #filmBodyContainer = null;
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  #currentSortType = SortType.DEFAULT;


  constructor(filmMainContainer, filmsModel) {
    this.#filmBodyContainer = filmMainContainer;
    this.#filmMainContainer = filmMainContainer.querySelector('.main');
    this.#filmsModel = filmsModel;
    this.#filmDetailPresenter = new FilmDetailPresenter(this.#handleFilmUpdate)
  }

  init = () => {
    //Получаем данные о фильмах
    this.#filmsList = [...this.#filmsModel.films];
    this.#sourcedFilmsList = [...this.#filmsModel.films];


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
    console.log("Исходные данные",  this.#filmsList);
    // console.log("Исходные данные оригинал",  this.#sourcedFilmsList);
    const film = new FilmPresenter(this.#filmListContainerComponent.element, this.#handleFilmUpdate, this.#showFilmDetail, this.#hideFilmDetail);
    film.init(filmData);
    this.#filmPresenter.set(filmData.id, film);
  }

  #renderFilmList = () => {
    render(this.#filmSortComponent, this.#filmMainContainer);
    this.#filmSortComponent.setSortClickHandler(this.#handleSortClick);

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

  #showFilmDetail = (filmData) => {
    this.#filmDetailPresenter.closeFilmDetail();
    this.#filmDetailPresenter.init(filmData);
  }

  #hideFilmDetail = () => {
    this.#filmDetailPresenter.closeFilmDetail();
  }


  #clearFilmList = () => {
    this.#filmPresenter.forEach((film) => {film.destroy()});
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#buttonShowMoreComponent);
  }

  #handleFilmUpdate = (updatedFilm) => {
    this.#filmsList = updateItem(this.#filmsList, updatedFilm);
    this.#sourcedFilmsList = updateItem(this.#sourcedFilmsList, updatedFilm);

    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  };

  #sortFilms = (sortType) => {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _filmsList
    switch (sortType) {
      case SortType.DATE:
        this.#filmsList.sort(sortFilmsByDate);
        break;
      case SortType.RATING:
        this.#filmsList.sort(sortFilmByRating);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this.#filmsList = [...this.#sourcedFilmsList];
    }

    this.#currentSortType = sortType;
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

  #handleSortClick = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmList();
    this.#renderFilmList();
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

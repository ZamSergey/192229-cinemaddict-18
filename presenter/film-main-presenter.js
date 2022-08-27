import FilmListContainer from '../src/view/film-list-container.js';
import FilmList from '../src/view/film-list.js';
import ButtonShowMore from '../src/view/button-show-more.js';
import FilmListEmpty from '../src/view/list-empty-view';
import FilmContainer from '../src/view/film-container.js';
import FilmCard from '../src/view/film-card.js';
import {render} from '../src/render';
import Filter from "../src/view/filters";
import Sort from "../src/view/sort";
import FilmDetailPresenter from "./film-detail-presenter";
import FilmDetailModel from "../src/model/films-detail-model";

const FILM_COUNT_PER_STEP = 5;

export default class FilmMainPresenter {

  #filmDetailPresenter = new FilmDetailPresenter();
  #filmDetailModel = new FilmDetailModel();

  #filmComponent = new FilmContainer();
  #filmListComponent = new FilmList();
  #filmListContainerComponent = new FilmListContainer();
  #filmFilterComponent = new Filter();
  #filmSortComponent = new Sort();
  #filmListEmptyComponent = new FilmListEmpty();
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
    render(this.#filmFilterComponent, this.#filmMainContainer);


    if (this.#filmsList.length == 0) {
      render(this.#filmComponent, this.#filmMainContainer);
      render(this.#filmListComponent,this.#filmComponent.element);
      render(new FilmListEmpty(), this.#filmListComponent.element);
    } else {
      render(this.#filmSortComponent, this.#filmMainContainer);
      render(this.#filmComponent, this.#filmMainContainer);
      render(this.#filmListComponent,this.#filmComponent.element);
      render(this.#filmListContainerComponent,this.#filmListComponent.element);
      //Отрисовка контейнера для карточек фильмов
      render(this.#filmListContainerComponent,this.#filmListComponent.element);

      for (let i = 0; i < Math.min(this.#filmsList.length, FILM_COUNT_PER_STEP); i++) {
        this.#renderFilm(this.#filmsList[i]);
      }


      if (this.#filmsList.length > FILM_COUNT_PER_STEP) {
        this.#renderButtonShowMore();
        this.#buttonShowMoreComponent.element.addEventListener('click', this.#handleLoadMoreButtonClick);
      }
    }

  };

  #renderFilm = (filmData) => {

    const film = new FilmCard(filmData);
    render(film, this.#filmListContainerComponent.element);
    //Установка обработчика клика по фильму и показ подробной информации
    film.element.querySelector('.film-card__link').addEventListener('click', () => {
      this.#showDetailFilm(this.#filmDetailModel);

    });
  }

  #showDetailFilm = (filmData) => {
    this.#filmDetailPresenter.init(this.#filmBodyContainer, filmData);
  }

  #renderButtonShowMore = () => {
    this.#buttonShowMoreComponent = new ButtonShowMore();
    render(this.#buttonShowMoreComponent, this.#filmListComponent.element);
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

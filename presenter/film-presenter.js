import FilmListContainer from '../src/view/film-list-container.js';
import FilmCard from '../src/view/film-card.js';
import {render, replace, remove} from '../src/framework/render.js';
import FilmDetailPresenter from './film-detail-presenter';


export default class FilmPresenter {

  #filmDetailPresenter = new FilmDetailPresenter();
  #filmListContainerComponent = new FilmListContainer();
  #filmComponent = null;


  #filmMainContainer = null;
  #filmData = null;

  #filmBodyContainer = null;

  constructor(filmMainContainer ) {
    this.#filmMainContainer = filmMainContainer;
  }

  init = (filmData) => {

    this.#filmData = filmData;
    const prevFilmComponent = this.#filmComponent;


    if (prevFilmComponent === null) {
      this.#renderFilm(filmData);
      return;
    }

    if (this.#filmMainContainer.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  };

  #renderFilm = (filmData) => {
    this.#filmComponent = new FilmCard(filmData);

    render(this.#filmComponent,  this.#filmMainContainer);
    this.#setFilmClickHandler();
  };

  #showDetailFilm = (filmData) => {
    this.#filmDetailPresenter.init(filmData);
  };

  #setFilmClickHandler = () => {
    //Установка обработчика клика по фильму и показ подробной информации
    this.#filmComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      this.#showDetailFilm(this.#filmData);
    });
  }

}

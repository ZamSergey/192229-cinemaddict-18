import FilmListContainer from '../src/view/film-list-container.js';
import FilmCard from '../src/view/film-card.js';
import {render, replace, remove} from '../src/framework/render.js';
import FilmDetailPresenter from './film-detail-presenter';
import {getRandomInteger} from '../src/utils/common';
import {FILMS} from '../src/mock/const';


export default class FilmPresenter {

  #filmDetailPresenter = null;
  #filmComponent = null;
  #filmMainContainer = null;
  #filmData = null;
  #changFilmData = null;

  constructor(filmMainContainer, filmChangeData ) {
    this.#filmMainContainer = filmMainContainer;
    this.#changFilmData = filmChangeData;
  }

  init = (filmData, filmDetailPresenter) => {

    this.#filmDetailPresenter = filmDetailPresenter;
    this.#filmData = filmData;


    const prevFilmComponent = this.#filmComponent;

    this.#filmComponent = new FilmCard(filmData);

    if (prevFilmComponent === null) {
      this.#renderFilm(filmData);
      return;
    }

    if (this.#filmMainContainer.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  };

  #renderFilm = () => {
    render(this.#filmComponent,  this.#filmMainContainer);
    this.#setFilmClickHandler(this.#showDetailFilm);
    this.#setChangeControlHandler(this.#updateFilmData);
  };

  #setFilmClickHandler = (clickHandler) => {
    //Установка обработчика клика по фильму и показ подробной информации
    this.#filmComponent.setClickHandler(clickHandler);
  }

  #showDetailFilm = () => {
    this.#filmDetailPresenter.init(this.#filmData);

  };

  #setChangeControlHandler = (clickHandler) => {
    //Установка обработчика клика по фильму и показ подробной информации
    this.#filmComponent.setChangeControlHandler(clickHandler);
  }

  #updateFilmData = (target) => {
    this.#filmData.user_details[target] = !this.#filmData.user_details[target];
    this.#changFilmData(this.#filmData);
  };

  destroy = () => {
    remove(this.#filmComponent);
  }

}

import FilmCard from '../src/view/film-card.js';
import {render, replace, remove} from '../src/framework/render.js';
const cloneDeep = require('lodash.clonedeep');


export default class FilmPresenter {

  #filmComponent = null;
  #filmMainContainer = null;
  #filmData = null;
  #changFilmData = null;
  #showFilmDetailHandler = null;
  #hideFilmDetailHandler = null;

  constructor(filmMainContainer, filmChangeData, showFilmDetailHandler, hideFilmDetailHandler ) {
    this.#filmMainContainer = filmMainContainer;
    this.#changFilmData = filmChangeData;
    this.#showFilmDetailHandler = showFilmDetailHandler;
    this.#hideFilmDetailHandler = hideFilmDetailHandler;

  }

  init = (filmData) => {
    this.#filmData = cloneDeep(filmData);
    const prevFilmComponent = this.#filmComponent;

    this.#filmComponent = new FilmCard(filmData);

    if (prevFilmComponent === null) {
      this.#renderFilm(filmData);
      return;
    }

    if (this.#filmMainContainer.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
      this.#setFilmClickHandler(this.#showFilmDetailWrapper);
      this.#setChangeControlHandler(this.#updateFilmData);
    }

    remove(prevFilmComponent);
  };

  #renderFilm = () => {
    render(this.#filmComponent,  this.#filmMainContainer);
    this.#setFilmClickHandler(this.#showFilmDetailWrapper);
    this.#setChangeControlHandler(this.#updateFilmData);
  };

  #setFilmClickHandler = (clickHandler) => {
    //Установка обработчика клика по фильму и показ подробной информации
    this.#filmComponent.setClickHandler(clickHandler);

  }
  //Сделал обертку, поскольку не знал как передать данные о фильме(в this.#setFilmClickHandler нельзя передать параметры обработчика)
  #showFilmDetailWrapper = () => {
    this.#hideFilmDetailHandler();
    this.#showFilmDetailHandler(this.#filmData);
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

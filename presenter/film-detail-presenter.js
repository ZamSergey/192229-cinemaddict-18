import {render, remove} from '../src/framework/render.js';
import FilmDetailsComponent from '../src/view/film-details-component.js';
const cloneDeep = require('lodash.clonedeep');

export default class FilmDetailPresenter {
  #siteBodyElement = null;
  #filmData = null;
  #filmDetailComponent = null;
  #filmUpdateHandler = null;
  #isOpen = false;

  constructor(filmUpdateHandler) {
    this.#filmUpdateHandler = filmUpdateHandler;
  }

  init = (filmData) => {

    this.#siteBodyElement = document.querySelector('body');
    this.#filmData = cloneDeep(filmData);

    this.#filmDetailComponent = new FilmDetailsComponent(filmData);

    this.#renderFilmDetail();

  };

  #renderFilmDetail () {
    this.#isOpen = true;
    this.#siteBodyElement.classList.add('hide-overflow');

    render(this.#filmDetailComponent,  this.#siteBodyElement);

    this.#filmDetailComponent.setCloseClickHandler(this.#closeClickHandler);

    this.#filmDetailComponent.setChangeControlHandler(this.#updateFilmDataHandler);

    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  #destroy = () => {
    remove(this.#filmDetailComponent)
    this.#siteBodyElement.classList.remove('hide-overflow');
    // this.#filmUpdateHandler(this.#filmData);
    this.#filmDetailComponent.reset(this.#filmData);

  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#destroy();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  }

  #closeClickHandler = () => {
    this.#destroy();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }
  //Публичный метод для закрытия
  closeFilmDetail = () => {
    if(this.#isOpen) {
      this.#isOpen = false;
      this.#closeClickHandler();
    }
  }

  #updateFilmDataHandler = (target) => {
    this.#filmData.user_details[target] = !this.#filmData.user_details[target];
    this.#filmUpdateHandler(this.#filmData);
  }
}

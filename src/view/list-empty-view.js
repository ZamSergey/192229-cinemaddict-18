import {createElement} from '../render.js';

const createFilmListEmptyTemplate = () => '<h2 class="films-list__title">There are no movies in our database</h2>';

export default class FilmListEmpty {
  #element = null;
  get template() {
    return createFilmListEmptyTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}


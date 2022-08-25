import {generateFilm} from '../mock/film.js';

export default class FilmDetailModel {
  #films = generateFilm();

  get films () {
    return this.#films;
  }
}

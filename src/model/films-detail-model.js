import {generateFilm} from '../mock/film.js';

export default class FilmDetailModel {
  films = generateFilm();

  getFilm = () => this.films;
}

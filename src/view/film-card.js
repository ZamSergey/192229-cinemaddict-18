import {createElement} from '../render.js';
import {humanizeFilmDate, filmRuntime} from '../utils.js';

const createFilmCardTemplate = (filmsData) => {
  const filmInfo = filmsData['film_info'];
  const filmComment = filmsData['comments'];
  const {title, release, runtime, description, genre, poster} = filmInfo;
  const totalRating = filmInfo.total_rating;
  const alternativeTitle = filmInfo.alternative_title;
  const filmDuration = filmRuntime(runtime);

  const year = humanizeFilmDate(release.date);

  return `<article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${totalRating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${year}</span>
              <span class="film-card__duration">${filmDuration}</span>
              <span class="film-card__genre">${genre}</span>
            </p>
            <img src="${poster}" alt="${alternativeTitle}" class="film-card__poster">
            <p class="film-card__description">${description}</p>
            <span class="film-card__comments">${filmComment.length} comments</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article>`;
};
export default class FilmCard {
  #element = null;
  #filmData = null;
  #filmLink = null;

  constructor(filmData) {
    this.#filmData = filmData;
  }

  get template() {
    return createFilmCardTemplate(this.#filmData);
  }

  get element() {
    if (!this.#element) {
      this.#element =  createElement(this.template);
    }
    return this.#element;
  }

  get filmData() {
    return this.#filmData;
  }



  removeElement() {
    this.#element = null;
  }
}

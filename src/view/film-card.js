import {createElement} from '../render.js';
import {humanizeFilmDate, filmRuntime} from '../utils.js';

const createFilmCardTemplate = (filmsData) => {
  const filmInfo = filmsData['film_info'];
  const filmComment = filmsData['comments'];
  const {title, total_rating, release, runtime, description, genre, poster, alternative_title} = filmInfo;
  const filmDuration = filmRuntime(runtime)

  const year = humanizeFilmDate(release.date);

  return `<article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${total_rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${year}</span>
              <span class="film-card__duration">${filmDuration}</span>
              <span class="film-card__genre">${genre}</span>
            </p>
            <img src="${poster}" alt="${alternative_title}" class="film-card__poster">
            <p class="film-card__description">${description}</p>
            <span class="film-card__comments">${filmComment.length} comments</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article>`;
}
export default class FilmCard {
  constructor(film) {
    this.film = film;
  }
  getTemplate() {
    return createFilmCardTemplate(this.film);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}



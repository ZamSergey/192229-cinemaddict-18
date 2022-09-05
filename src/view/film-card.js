import AbstractView from '../framework/view/abstract-view.js';
import {humanizeFilmDate, filmRuntime} from '../utils/date.js';

const createFilmCardTemplate = (filmsData) => {
  const filmInfo = filmsData['film_info'];
  const filmComment = filmsData['comments'];
  const userDetails = filmsData['user_details'];
  const {title, release, runtime, description, genre, poster} = filmInfo;
  const {watchlist, favorite} = userDetails;
  const alreadyWatched = userDetails['already_watched'];
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
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${ watchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${ alreadyWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite ${ favorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCard extends AbstractView {
  #filmData = null;

  constructor(filmData) {
    super();
    this.#filmData = filmData;
  }

  get template() {
    return createFilmCardTemplate(this.#filmData);
  }

  setClickHandler = (callback) => {
    // Мы могли бы сразу передать callback в addEventListener,
    // но тогда бы для удаления обработчика в будущем,
    // нам нужно было бы производить это снаружи, где-то там,
    // где мы вызывали setClickHandler, что не всегда удобно

    // 1. Поэтому колбэк мы запишем во внутреннее свойство
    this._callback.click = callback;
    // 2. В addEventListener передадим абстрактный обработчик
    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    // 3. А внутри абстрактного обработчика вызовем колбэк
    this._callback.click();
  };

  setChangeControlHandler = (callback) => {

    this._callback.changeControl = callback;

    this.element.querySelector('.film-card__controls').addEventListener('click', this.#changeControlHandler);
  };

  #changeControlHandler = (evt) => {
    evt.preventDefault();
    const buttonClassList = evt.target.classList;

    if ( buttonClassList.contains('film-card__controls-item--add-to-watchlist') ) {
      this._callback.changeControl('watchlist');
      evt.target.classList.toggle('film-card__controls-item--active');
    }

    if (buttonClassList.contains('film-card__controls-item--mark-as-watched')) {
      this._callback.changeControl('already_watched');
      evt.target.classList.toggle('film-card__controls-item--active');
    }

    if (buttonClassList.contains('film-card__controls-item--favorite')) {
      this._callback.changeControl('favorite');
      evt.target.classList.toggle('film-card__controls-item--active')
    }
  };
}

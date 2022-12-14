import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {humanizeFilmDate, filmRuntime} from '../utils/date.js';
import {EMOTYON} from '../mock/const.js';
import {getCommentDate} from '../utils/date.js';
import CommentsModel from '../model/comments-model';

const filmCommentModel = new CommentsModel();
const filmsCommentData = filmCommentModel.comments;

const createCommentTemplate = (commentData) => {
  const {author, comment, date, emotion} = commentData;

  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
  <img src="${EMOTYON[emotion]}" width="55" height="55" alt="emoji-${emotion}">
  </span>
  <div>
  <p class="film-details__comment-text">${comment}</p>
<p class="film-details__comment-info">
  <span class="film-details__comment-author">${author}</span>
<span class="film-details__comment-day">${getCommentDate(date)}</span>
<button class="film-details__comment-delete">Delete</button>
  </p>
  </div>
  </li>`;
};

const createCommentList = (data) => data.map( (filmComment) => createCommentTemplate(filmComment)).join('');


const setGenre = (genre) => {

  let genreList = '';
  for(const genr of genre) {
    genreList += `<span class="film-details__genre">${genr}</span>`;
  }

  return genreList;
};

const createPopUpTemplate = (film) => {

  const {title, poster, director, writers, actors, release, runtime, genre, description} = film.film_info;
  const alternativeTitle = film.film_info.alternative_title;
  const totalRating = film.film_info.total_rating;
  const ageRating = film.film_info.age_rating;
  const filmWriters = writers.join(', ');
  const filmActors = actors.join(', ');
  const isWatchlist = film.user_details.watchlist;
  const isWatched = film.user_details.already_watched;
  const isFavorite = film.user_details.favorite;
  const commentCounter = film.comments ? film.comments.length : 0;

  return `<section class="film-details">
  <div class="film-details__inner">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./${poster}" alt="${title}">

          <p class="film-details__age">${ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${alternativeTitle}</h3>
              <p class="film-details__title-original">Original: ${title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${filmWriters}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${filmActors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${humanizeFilmDate(release.date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${filmRuntime(runtime)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${release.release_country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${setGenre(genre)}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
          ${description}
            </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button ${isWatchlist ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button ${isWatched ? 'film-details__control-button--active' : ''} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button ${isFavorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCounter}</span></h3>

        <ul class="film-details__comments-list">
            ${createCommentList(filmsCommentData)}
        </ul>

        <form class="film-details__new-comment" action="" method="get">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </form>
      </section>
    </div>
  </div>
</section>`;
};

export default class FilmDetailsComponent extends AbstractStatefulView {

  constructor(film) {
    super();
    this._state = FilmDetailsComponent.parseFilmToState(film);
    this.#setInnerHandlers();
  }

  get template() {
    return createPopUpTemplate(this._state);
  }

  get commentContainer() {
    return this.element.querySelector('.film-details__comments-list');
  }

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeClickHandler);
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
  };

  setChangeControlHandler = (callback) => {

    this._callback.changeControl = callback;

    this.element.querySelectorAll('.film-details__controls button').forEach((button) => button.addEventListener('click', this.#changeControlHandler));

  };

  #changeControlHandler = (evt) => {
    evt.preventDefault();

    if ( evt.target.id === 'watchlist') {
      this._callback.changeControl('watchlist');
      evt.target.classList.toggle('film-details__control-button--active');
    }

    if ( evt.target.id === 'watched') {
      this._callback.changeControl('already_watched');
      evt.target.classList.toggle('film-details__control-button--active');
    }

    if ( evt.target.id === 'favorite') {
      this._callback.changeControl('favorite');
      evt.target.classList.toggle('film-details__control-button--active');
    }
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__new-comment').elements['comment-emoji'].forEach((button) => button.addEventListener('click', this.#changeEmotionHandler));
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#feedbackTextHandler);
    this.element.querySelectorAll('.film-details__comment-delete').forEach((button) => button.addEventListener('click', this.#deleteComment));
  };

  #changeEmotionHandler = (evt) => {
    evt.preventDefault();

    if(evt.target.value !== this._state.emoji) {
      this.updateElement({
        emoji: evt.target.value,
        emojiTemplate: `<img src="${EMOTYON[evt.target.value]}" width="100%" height="100%" alt="emoji-${evt.target.value}">`,
      });
      this.#setEmojiInput();
      this.#setFeedbackText();
    }
  };

  #feedbackTextHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      feedbackText: evt.target.value,
    });
  };

  #deleteComment = (evt) => {
    // ???????????????? Html
    evt.target.closest('.film-details__comment').remove();
    // ???????????????? ????????????
    // ???????????????????????? ?????????????????????? ?????? ?????? ????????(?????? ??????????)
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseClickHandler(this._callback.closeClick);
    this.setChangeControlHandler(this._callback.changeControl);

  };

  #setEmojiInput = () => {
    const emijiContainer = this.element.querySelector('.film-details__add-emoji-label');
    emijiContainer.insertAdjacentHTML('afterbegin', this._state.emojiTemplate);
    if(!this.element.querySelector(`#emoji-${this._state.emoji}`).checked) {
      this.element.querySelector(`#emoji-${this._state.emoji}`).checked = true;
    }

    this.element.scroll(0, this.element.getBoundingClientRect().height);

  };

  #setFeedbackText = () => {
    if(this._state.feedbackText) {
      this.element.querySelector('.film-details__comment-input').value = this._state.feedbackText;
    }
  };

  static parseFilmToState = (film) => ({...film,
    emoji: '',
    feedbackText: '',
    emojiTemplate: ''
  });

  static parseStateToFilm = (state) => {
    const film = {...state};

    delete film.emoji;
    delete film.feedbackText;
    delete film.emojiTemplate;

    return film;
  };

  reset = (film) => {
    this.updateElement(
      FilmDetailsComponent.parseStateToFilm(film),
    );
  };

}

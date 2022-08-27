import {createElement} from '../render';
import {getCommentDate} from '../utils.js';
import {EMOTYON} from '../mock/const.js';

const createCommentTemplate = (commentData) => {
  const {author, comment, date, emotion} = commentData;

  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
  <img src="${EMOTYON[emotion]}" width="55" height="55" alt="emoji-${emotion}}">
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

export default class FilmComment {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }

  get template() {
    return createCommentTemplate(this.#film);
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

import AbstractView from '../framework/view/abstract-view.js';
import {getCommentDate} from '../utils/date.js';
import {EMOTYON} from '../mock/const.js';

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

export default class FilmComment extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createCommentTemplate(this.#film);
  }
}

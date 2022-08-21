import {createElement} from "../render";
import {getCommentDate} from '../utils.js';
import {EMOTYON} from "../mock/const.js";

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
  </li>`
}

export default class FilmComment {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return createCommentTemplate(this.film);
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

import {generateComment} from '../mock/film.js';


export default class CommentsModel {
  films = Array.from({length:3},generateComment);

  getComments = () => this.films;
}

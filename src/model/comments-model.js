import {generateComment} from '../mock/comment.js';

export default class CommentsModel {
  #comments = generateComment();

  get comments () {
    return this.#comments;
  }
};

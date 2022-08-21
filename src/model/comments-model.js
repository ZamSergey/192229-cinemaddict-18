import {generateComment} from '../mock/comment.js';

export default class CommentsModel {
  constructor(idArray) {
    this.idArray = idArray;
  }

  getComments = () => generateComment(this.idArray);
}

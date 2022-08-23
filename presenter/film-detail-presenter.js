import {render} from '../src/render';
import FilmDetailsPopUp from '../src/view/film-details-pop-up.js';
import FilmComment from '../src/view/film-comment-view.js';
import CommentsModel from '../src/model/comments-model.js';

export default class FilmDetailPresenter {

  init = (siteBodyElement, filmsModel) => {

    this.siteBodyElement = siteBodyElement;
    this.filmsDetailModel = filmsModel;
    this.filmDetail = filmsModel.getFilm();
    this.filmCommentData = new CommentsModel(this.filmDetail.comments);

    this.comments = this.filmCommentData.getComments(this.filmDetail.comments);

    render(new FilmDetailsPopUp(this.filmDetail), siteBodyElement);
    //Находим в отрисованном элементе контейнер для комментариев
    const commentContainer = siteBodyElement.querySelector('.film-details__comments-list');

    for(let comment of this.comments) {
      render(new FilmComment(comment), commentContainer)
    }

  };
}

import {render} from '../src/render';
import FilmDetailsPopUp from '../src/view/film-details-pop-up.js';
import FilmComment from '../src/view/film-comment-view.js';
import CommentsModel from '../src/model/comments-model.js';

export default class FilmDetailPresenter {
  #siteBodyElement = null;
  #filmsDetailModel = null;
  #filmCommentModel = new CommentsModel();

  init = (siteBodyElement, filmsModel) => {

    this.#siteBodyElement = siteBodyElement;
    this.#filmsDetailModel = filmsModel;

    const filmDetailsElement = new FilmDetailsPopUp(this.#filmsDetailModel.films);
    render(filmDetailsElement,  this.#siteBodyElement);
    filmDetailsElement.element.querySelector('.film-details__close-btn').addEventListener('click', () => {

      this.#siteBodyElement.removeChild(filmDetailsElement.element);
    });

    //Находим в отрисованном элементе контейнер для комментариев
    const commentContainer = siteBodyElement.querySelector('.film-details__comments-list');

    for(let comment of  this.#filmCommentModel.comments) {
      render(new FilmComment(comment), commentContainer)
    }

  };
}

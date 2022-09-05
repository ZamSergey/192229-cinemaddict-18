import {render, remove} from '../src/framework/render.js';
import FilmDetailsPopUp from '../src/view/film-details-pop-up.js';
import FilmComment from '../src/view/film-comment-view.js';
import CommentsModel from '../src/model/comments-model.js';

export default class FilmDetailPresenter {
  #siteBodyElement = null;
  #filmData = null;
  #filmDetailElement = null;
  #filmCommentModel = new CommentsModel();

  init = (filmData) => {

    this.#siteBodyElement = document.querySelector('body');
    this.#filmData = filmData;
    this.#filmDetailElement = new FilmDetailsPopUp(filmData);

    this.#renderDetailPopUp();
    this.#renderComments(this.#filmCommentModel.comments);

  };

  #renderDetailPopUp () {

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.#destroy();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    this.#siteBodyElement.classList.add('hide-overflow');

    render(this.#filmDetailElement,  this.#siteBodyElement);

    this.#filmDetailElement.setCloseClickHandler(() => {
      this.#destroy();
      document.removeEventListener('keydown', onEscKeyDown);
    });
    this.#filmDetailElement.setChangeControlHandler(this.#updateFilmData);

    document.addEventListener('keydown', onEscKeyDown);
  }

  #destroy = () => {
    // this.#siteBodyElement.removeChild(this.#filmDetailElement.element);
    remove(this.#filmDetailElement)
    this.#siteBodyElement.classList.remove('hide-overflow');

  }

  #renderComments (comments) {
    //Находим в отрисованном элементе контейнер для комментариев
    for(let comment of  comments) {
      render(new FilmComment(comment), this.#filmDetailElement.commentContainer)
    }
  }

  #updateFilmData = (target) => {
    this.#filmData.user_details[target] = !this.#filmData.user_details[target];
  }



}

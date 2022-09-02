import {render} from '../src/framework/render.js';
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

    this.#renderDetailPopUp(filmData);
    this.#renderComments(this.#filmCommentModel.comments);
  };

  #renderDetailPopUp (filmData) {

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.#removeDatailPopUp(this.#filmDetailElement.element);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    this.#filmDetailElement = new FilmDetailsPopUp(filmData);
    this.#siteBodyElement.classList.add('hide-overflow');

    render(this.#filmDetailElement,  this.#siteBodyElement);

    this.#filmDetailElement.setCloseClickHandler(() => {
      this.#removeDatailPopUp();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    document.addEventListener('keydown', onEscKeyDown);
  }

  #removeDatailPopUp = () => {
    this.#siteBodyElement.removeChild(this.#filmDetailElement.element);
    this.#siteBodyElement.classList.remove('hide-overflow');

  }

  #renderComments (comments) {
    //Находим в отрисованном элементе контейнер для комментариев
    const commentContainer = this.#siteBodyElement.querySelector('.film-details__comments-list');

    for(let comment of  comments) {
      render(new FilmComment(comment), commentContainer)
    }
  }
}

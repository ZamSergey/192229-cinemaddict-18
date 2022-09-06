import {render, remove} from '../src/framework/render.js';
import FilmDetailsPopUp from '../src/view/film-details-pop-up.js';
import FilmComment from '../src/view/film-comment-view.js';
import CommentsModel from '../src/model/comments-model.js';
import {replace} from "../src/framework/render";

export default class FilmDetailPresenter {
  #siteBodyElement = null;
  #filmData = null;
  #filmDetailComponent = null;
  #filmCommentModel = new CommentsModel();

  init = (filmData) => {

    this.#siteBodyElement = document.querySelector('body');
    this.#filmData = filmData;

    this.#filmDetailComponent = new FilmDetailsPopUp(filmData);


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

    render(this.#filmDetailComponent,  this.#siteBodyElement);

    this.#filmDetailComponent.setCloseClickHandler(() => {
      this.#destroy();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    this.#filmDetailComponent.setChangeControlHandler(this.#updateFilmData);

    document.addEventListener('keydown', onEscKeyDown);
  }

  #destroy = () => {
    // this.#siteBodyElement.removeChild(this.#filmDetailComponent.element);
    remove(this.#filmDetailComponent)
    this.#siteBodyElement.classList.remove('hide-overflow');

  }

  #renderComments (comments) {
    //Находим в отрисованном элементе контейнер для комментариев
    for(let comment of  comments) {
      render(new FilmComment(comment), this.#filmDetailComponent.commentContainer)
    }
  }

  #updateFilmData = (target) => {
    this.#filmData.user_details[target] = !this.#filmData.user_details[target];
  }



}

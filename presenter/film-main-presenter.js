import FilmListContainer from '../src/view/film-list-container.js';
import FilmList from '../src/view/film-list.js';
import ButtonShowMore from '..//src/view/button-show-more';
import FilmContainer from '../src/view/film-container.js';
import FilmCard from '../src/view/film-card.js';
import {render} from '../src/render';
import Filter from "../src/view/filters";
import Sort from "../src/view/sort";
import FilmDetailPresenter from "./film-detail-presenter";
import FilmDetailModel from "../src/model/films-detail-model";


export default class FilmMainPresenter {

  #filmDetailPresenter = new FilmDetailPresenter();
  #filmDetailModel = new FilmDetailModel();

  #filmComponent = new FilmContainer();
  #filmListComponent = new FilmList();
  #filmListContainerComponent = new FilmListContainer();
  #filmFilterComponent = new Filter();
  #filmSortComponent = new Sort();

  #filmMainContainer = null;
  #filmsModel = null;
  #filmsList = null;
  #filmBodyContainer = null;


  init = (filmMainContainer, filmsModel) => {
    this.#filmBodyContainer = filmMainContainer;


    this.#filmMainContainer = filmMainContainer.querySelector('.main');
    this.#filmsModel = filmsModel;
    this.#filmsList = [... this.#filmsModel.films];

    //Отрисовка крупных блоков
    //Навигация(Филтры)
    render(this.#filmFilterComponent, this.#filmMainContainer);
    //Сортировка
    render(this.#filmSortComponent, this.#filmMainContainer);
    render(this.#filmComponent, this.#filmMainContainer);
    render(this.#filmListComponent,this.#filmComponent.element);
    render(this.#filmListContainerComponent,this.#filmListComponent.element);
    //Отрисовка контейнера для карточек фильмов
    render(this.#filmListContainerComponent,this.#filmListComponent.element);

    for (let i = 0; i < this.#filmsList.length; i++) {
      this.#renderFilm(this.#filmsList[i])
    }

    // Кнопка Показать больше
    render(new ButtonShowMore(),this.#filmListComponent.element);
  };

  #renderFilm = (filmData) => {

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        // replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const film = new FilmCard(filmData);
    render(film, this.#filmListContainerComponent.element);
    //Установка обработчика клика по фильму и показ подробной информации
    film.element.querySelector('.film-card__link').addEventListener('click', () => {
      this.#showDetailFilm(this.#filmDetailModel);

    });
  }

  #showDetailFilm = (filmData) => {
    this.#filmDetailPresenter.init(this.#filmBodyContainer, filmData);
  }


}

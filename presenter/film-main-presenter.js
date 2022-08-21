import FilmListContainer from '../src/view/film-list-container.js';
import FilmList from '../src/view/film-list.js';
import ButtonShowMore from '..//src/view/button-show-more';
import FilmContainer from '../src/view/film-container.js';
import FilmCard from '../src/view/film-card.js';
import {render} from '../src/render';
import Filter from "../src/view/filters";
import Sort from "../src/view/sort";

export default class FilmMainPresenter {

  filmComponent = new FilmContainer();
  filmListComponent = new FilmList();
  filmListContainerComponent = new FilmListContainer();
  filmFilterComponent = new Filter();
  filmSortComponent = new Sort();

  init = (filmMainContainer, filmsModel) => {

    this.filmMainContainer = filmMainContainer.querySelector('.main');
    this.filmsModel = filmsModel;
    this.filmsList = [... this.filmsModel.getFilms()];

    //Отрисовка крупных блоков
    //Навигация(Филтры)
    render(this.filmFilterComponent, this.filmMainContainer);
    //Сортировка
    render(this.filmSortComponent, this.filmMainContainer);

    render(this.filmComponent, this.filmMainContainer);
    render(this.filmListComponent,this.filmComponent.getElement());
    render(this.filmListContainerComponent,this.filmListComponent.getElement());

    //Отрисовка контейнера для карточек фильмов
    render(this.filmListContainerComponent,this.filmListComponent.getElement());

    for (let i = 0; i < this.filmsList.length; i++) {
      render(new FilmCard(this.filmsList[i]), this.filmListContainerComponent.getElement())
    }
    // Кнопка Показать больше
    render(new ButtonShowMore(),this.filmListComponent.getElement());
  };
}

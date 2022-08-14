import FilmListContainer from '../src/view/film-list-container.js';
import FilmList from '../src/view/film-list.js';
import ButtonShowMore from '..//src/view/button-show-more';
import FilmContainer from '../src/view/film-container.js';
import FilmCard from '../src/view/film-card.js';

import {render} from '../src/render';

export default class FilmMainPresenter {

  filmComponent = new FilmContainer();
  filmListComponent = new FilmList();
  filmListContainerComponent = new FilmListContainer();

  init = (filmMainContainer) => {
    this.filmMainContainer = filmMainContainer;

    //Отрисовка крупных блоков
    render(this.filmComponent, this.filmMainContainer);
    render(this.filmListComponent,this.filmComponent.getElement());
    render(this.filmListContainerComponent,this.filmListComponent.getElement());

    //Отрисовка контейнера для карточек фильмов
    render(this.filmListContainerComponent,this.filmListComponent.getElement());

    for (let i = 0; i < 5; i++) {
      render(new FilmCard(),this.filmListContainerComponent.getElement())
    }
    // Кнопка Показать больше
    render(new ButtonShowMore(),this.filmListComponent.getElement());
  };
}





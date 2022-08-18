import {render} from '../src/render';
import FilmDetailsPopUp from '../src/view/film-details-pop-up.js';

export default class FilmDetailPresenter {

  // filmDetailComponent = new FilmDetailsPopUp();

  init = (siteBodyElement, filmsModel) => {
    this.siteBodyElement = siteBodyElement;
    this.filmsDetailModel = filmsModel;
    this.filmDetail = filmsModel.getFilm();

    render(new FilmDetailsPopUp(this.filmDetail), siteBodyElement);
  };
}

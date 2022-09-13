import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../mock/const';

const createSortTemplate = () =>
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort="${SortType.RATING}">Sort by rating</a></li>
  </ul>`;

export default class Sort extends AbstractView {
  get template() {
    return createSortTemplate();
  }

  setSortClickHandler = (callback) => {
    this._callback.sortClick = callback;
    this.element.querySelectorAll('.sort [data-sort]').forEach((button) => button.addEventListener('click', this.#sortClickHandler));
  };

  #sortClickHandler = (evt) => {
    evt.preventDefault();
    if ( evt.target.dataset.sort === 'default') {
      this._callback.sortClick( evt.target.dataset.sort);
      this.#switchActiveSort(evt.target);
    }

    if ( evt.target.dataset.sort === 'date') {
      this._callback.sortClick( evt.target.dataset.sort);
      this.#switchActiveSort(evt.target);
    }

    if ( evt.target.dataset.sort === 'rating') {
      this._callback.sortClick( evt.target.dataset.sort);
      this.#switchActiveSort(evt.target);
    }
  };

  #switchActiveSort = (activeElement) => {
    this.element.querySelectorAll('.sort [data-sort]').forEach((button) => button.classList.remove('sort__button--active'));
    activeElement.classList.add('sort__button--active');
  };
}

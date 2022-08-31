import AbstractView from '../framework/view/abstract-view.js';

const createFilterItem = (filter) => {
  const {name, count, isActive} = filter;
  let itemTemplate = '';
  if (name === 'all') {
    itemTemplate = `<a href="#${name}" class="main-navigation__item ${isActive ? 'main-navigation__item--active' : ''}">All movies</a>`;
  }
  else {
    itemTemplate = `<a href="#${name}" class="main-navigation__item  ${isActive ? 'main-navigation__item--active' : ''}">${name} <span class="main-navigation__item-count">${count}</span></a>`;
  }
  return itemTemplate;
};

const createFilterTemplate = (filter) => {
  const filterList = filter.map((filterItem) => createFilterItem(filterItem)).join('');
  return `<nav class="main-navigation">${filterList}</nav>`;
};

export default class Filter extends AbstractView {
  #filter = null;

  constructor(filter) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createFilterTemplate(this.#filter);
  }
}

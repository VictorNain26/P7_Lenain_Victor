/* eslint-disable no-console */
import tagSearch from "../components/tag-search.js";

export default class search {
  static init = () => {
    this.search();
  };

  static search = () => {
    const cardsContainer = document.querySelector('#cards-container');
    const searchWord = document.querySelector('#search-word');
    const currentCards = document.querySelectorAll('.card');
    const notFound = document.querySelector('#not-found');

    searchWord.addEventListener('input', () => {
      const allTags = document.querySelectorAll('.tags');

      while (cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.firstChild);
      }
      if (searchWord.value.length <= 2 && allTags.length === 0) {
        currentCards.forEach((card) => cardsContainer.appendChild(card));
        tagSearch.refresh(currentCards);
        notFound.classList.add('hidden');
        return;
      }
      const newCards = [];

      for (let pas = 0; pas < currentCards.length; pas += 1) {
        const validateSearch = searchWord.value.length <= 2
          ? true
          : currentCards[pas].innerText.toLowerCase()
            .includes(searchWord.value.trim().toLowerCase());

        if (tagSearch.tagValidate(currentCards[pas]) && validateSearch) {
          newCards.push(currentCards[pas]);
          notFound.classList.add('hidden');
        }
      }

      if (newCards.length === 0) {
        notFound.classList.remove('hidden');
        return;
      }
      newCards.forEach((card) => cardsContainer.appendChild(card));
      tagSearch.refresh(currentCards);
    });
  };
}

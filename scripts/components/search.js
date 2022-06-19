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
      console.time('search');
      const filteredCards = Array.from(currentCards).filter((card) => {
        const validateSearch = searchWord.value.length <= 2
          ? true
          : card.innerText.toLowerCase().includes(searchWord.value.trim().toLowerCase());

        if (tagSearch.tagValidate(card) && validateSearch) {
          return card;
        }
        return false;
      });
      console.timeEnd('search');
      if (filteredCards.length === 0) {
        notFound.classList.remove('hidden');
        return;
      }

      filteredCards.forEach((card) => cardsContainer.appendChild(card));
      tagSearch.refresh(currentCards);
      notFound.classList.add('hidden');
    });
  };
}

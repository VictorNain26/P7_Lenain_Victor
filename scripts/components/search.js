/* eslint-disable no-console */
import tagSearch from "../components/tag-search.js";

export default class search {
  static init = () => {
    this.search();
  };

  static search = () => {
    const cardsContainer = document.querySelector('#cards-container');
    const searchWord = document.querySelector('#search-word');
    const allCards = document.querySelectorAll('.card');
    const notFound = document.querySelector('#not-found');
    let lastWord = '';

    searchWord.addEventListener('input', () => {
      const currentCards = document.querySelectorAll('.card');
      const allTags = document.querySelectorAll('.tags');
      let filteredCards = [];

      while (cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.firstChild);
      }
      if (searchWord.value.length <= 2 && allTags.length === 0) {
        allCards.forEach((card) => cardsContainer.appendChild(card));
        tagSearch.refresh(allCards);
        notFound.classList.add('hidden');
        lastWord = searchWord.value.trim().toLowerCase();
        return;
      }

      if (lastWord.length > searchWord.value.length || searchWord.value.length <= 2) {
        filteredCards = Array.from(allCards).filter((card) => {
          const validateSearch = searchWord.value.length <= 2
            ? true
            : card.innerText.toLowerCase().includes(searchWord.value.trim().toLowerCase());

          if (tagSearch.tagValidate(card) && validateSearch) {
            return card;
          }
          return false;
        });
      } else {
        filteredCards = Array.from(currentCards).filter((card) => {
          const validateSearch = searchWord.value.length <= 2
            ? true
            : card.innerText.toLowerCase().includes(searchWord.value.trim().toLowerCase());

          if (tagSearch.tagValidate(card) && validateSearch) {
            return card;
          }
          return false;
        });
      }
      if (filteredCards.length === 0) {
        notFound.classList.remove('hidden');
        lastWord = searchWord.value.trim().toLowerCase();
        return;
      }

      filteredCards.flat().forEach((card) => cardsContainer.appendChild(card));
      tagSearch.refresh(allCards);
      notFound.classList.add('hidden');
      lastWord = searchWord.value.trim().toLowerCase();
    });
  };
}

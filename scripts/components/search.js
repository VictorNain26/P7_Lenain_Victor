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
      while (cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.firstChild);
      }
      if (searchWord.value.length <= 2) {
        currentCards.forEach((card) => cardsContainer.appendChild(card));
        tagSearch.refresh(currentCards);
        notFound.classList.add('hidden');
        return;
      }
      const newCards = [];

      currentCards.forEach((card) => {
        // recherche sur toutes les cards une par une trouver un moyen pour
        // rendre la recherche plus rapide
        if (!card.innerText.toLowerCase().includes(searchWord.value.trim().toLowerCase())) return;

        newCards.push(card);
        notFound.classList.add('hidden');
      });
      if (newCards.length === 0) {
        notFound.classList.remove('hidden');
        return;
      }
      newCards.forEach((card) => cardsContainer.appendChild(card));
      tagSearch.refresh(currentCards);
    });
  };
}

/* eslint-disable no-console */
export default class tagSearch {
  static init = () => {
    const currentCards = document.querySelectorAll('.card');
    const ingredientsContainer = document.querySelector('#ingredients-tag-container');
    const ustensilsContainer = document.querySelector('#ustensils-tag-container');
    const appliancesContainer = document.querySelector('#appliances-tag-container');
    const ustensils = [];
    const appliances = [];
    const ingredients = [];

    currentCards.forEach((card) => {
      ustensils.push(card.dataset.ustensils.split(','));
      appliances.push(card.dataset.appliance);
      ingredients.push(card.dataset.ingredients.split(','));
    });

    Array.from(new Set(ustensils.flat())).forEach((ustensil) => {
      const nodeUstensil = document.createElement('p');
      nodeUstensil.classList.add('m-4', 'cursor-pointer');
      nodeUstensil.innerText = ustensil;

      nodeUstensil.addEventListener('click', (e) => this.addTag(e, 'bg-red-400', currentCards));

      ustensilsContainer.appendChild(nodeUstensil);
    });

    Array.from(new Set(appliances.flat())).forEach((appliance) => {
      const nodeAppliance = document.createElement('p');
      nodeAppliance.classList.add('m-4', 'cursor-pointer');
      nodeAppliance.innerText = appliance;

      nodeAppliance.addEventListener('click', (e) => this.addTag(e, 'bg-emerald-300', currentCards));

      appliancesContainer.appendChild(nodeAppliance);
    });

    Array.from(new Set(ingredients.flat())).forEach((ingredient) => {
      const nodeIngredient = document.createElement('p');
      nodeIngredient.classList.add('m-4', 'cursor-pointer');
      nodeIngredient.innerText = ingredient;

      nodeIngredient.addEventListener('click', (e) => this.addTag(e, 'bg-blue-500', currentCards));

      ingredientsContainer.appendChild(nodeIngredient);
    });
  };

  static refresh = (currentCards) => {
    const newCards = document.querySelectorAll('.card');
    const allTags = document.querySelectorAll('.tags');
    const ingredientsContainer = document.querySelector('#ingredients-tag-container');
    const ustensilsContainer = document.querySelector('#ustensils-tag-container');
    const appliancesContainer = document.querySelector('#appliances-tag-container');
    const ustensils = [];
    const appliances = [];
    const ingredients = [];
    const tagsArray = Array.from(allTags).map((tag) => tag.id);

    while (ingredientsContainer.firstChild) {
      ingredientsContainer.removeChild(ingredientsContainer.firstChild);
    }

    while (ustensilsContainer.firstChild) {
      ustensilsContainer.removeChild(ustensilsContainer.firstChild);
    }

    while (appliancesContainer.firstChild) {
      appliancesContainer.removeChild(appliancesContainer.firstChild);
    }

    newCards.forEach((card) => {
      ustensils.push(card.dataset.ustensils.split(','));
      appliances.push(card.dataset.appliance);
      ingredients.push(card.dataset.ingredients.split(','));
    });

    Array.from(new Set(ustensils.flat())).forEach((ustensil) => {
      if (tagsArray.includes(ustensil)) return;
      const nodeUstensil = document.createElement('p');
      nodeUstensil.classList.add('m-4', 'cursor-pointer');
      nodeUstensil.innerText = ustensil;

      nodeUstensil.addEventListener('click', (e) => this.addTag(e, 'bg-red-400', currentCards));

      ustensilsContainer.appendChild(nodeUstensil);
    });

    Array.from(new Set(appliances.flat())).forEach((appliance) => {
      if (tagsArray.includes(appliance)) return;
      const nodeAppliance = document.createElement('p');
      nodeAppliance.classList.add('m-4', 'cursor-pointer');
      nodeAppliance.innerText = appliance;

      nodeAppliance.addEventListener('click', (e) => this.addTag(e, 'bg-emerald-300', currentCards));

      appliancesContainer.appendChild(nodeAppliance);
    });

    Array.from(new Set(ingredients.flat())).forEach((ingredient) => {
      if (tagsArray.includes(ingredient)) return;
      const nodeIngredient = document.createElement('p');
      nodeIngredient.classList.add('m-4', 'cursor-pointer');
      nodeIngredient.innerText = ingredient;

      nodeIngredient.addEventListener('click', (e) => this.addTag(e, 'bg-blue-500', currentCards));

      ingredientsContainer.appendChild(nodeIngredient);
    });
  };

  static addTag = (e, color, currentCards) => {
    const tagsContainer = document.querySelector('#tag');

    tagsContainer.insertAdjacentHTML('beforeend', `
      <div id="${e.target.innerText}" class="tags flex flex-row justify-around items-center ${color} w-24 h-9 mr-4 rounded-md cursor-pointer">
        <p class="text-white text-xs pointer-events-none">${e.target.innerText}</p>
        <img src="./assets/close_cross.png" alt="tag close">
      </div>`);
    const removeTag = document.getElementById(e.target.innerText);
    removeTag.addEventListener('click', (tag) => this.removeTag(tag, currentCards));
    this.tagSearch(currentCards);
  };

  static removeTag = (tag, currentCards) => {
    const tags = document.querySelector('#tag');

    tags.removeChild(tag.target);
    this.tagSearch(currentCards);
  };

  static tagValidate = (card) => {
    const allTags = document.querySelectorAll('.tags');
    if (allTags.length === 0) return true;

    const cardArray = [];
    cardArray.push(card.dataset.ustensils.split(','));
    cardArray.push(card.dataset.appliance);
    cardArray.push(card.dataset.ingredients.split(','));

    const tagsArray = Array.from(allTags).map((tag) => tag.id);

    const test = tagsArray.every((element) => cardArray.flat().includes(element));
    return test;
  };

  static tagSearch = (currentCards) => {
    const allTags = document.querySelectorAll('.tags');
    const cardsContainer = document.querySelector('#cards-container');
    const searchWord = document.querySelector('#search-word');
    const notFound = document.querySelector('#not-found');

    while (cardsContainer.firstChild) {
      cardsContainer.removeChild(cardsContainer.firstChild);
    }

    if (searchWord.value.length <= 2 && allTags.length === 0) {
      currentCards.forEach((card) => cardsContainer.appendChild(card));
      tagSearch.refresh(currentCards);
      notFound.classList.add('hidden');
      return;
    }
    console.time('filter');
    const filteredCards = Array.from(currentCards).filter((card) => {
      const validateSearch = searchWord.value.length <= 2
        ? true
        : card.innerText.toLowerCase().includes(searchWord.value.trim().toLowerCase());

      if (tagSearch.tagValidate(card) && validateSearch) {
        return card;
      }
      return false;
    });
    console.timeEnd('filter');
    if (filteredCards.length === 0) {
      notFound.classList.remove('hidden');
      return;
    }

    filteredCards.forEach((card) => cardsContainer.appendChild(card));
    this.refresh(currentCards);
    notFound.classList.add('hidden');
  };
}

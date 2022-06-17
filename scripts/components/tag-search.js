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
    const ingredientsContainer = document.querySelector('#ingredients-tag-container');
    const ustensilsContainer = document.querySelector('#ustensils-tag-container');
    const appliancesContainer = document.querySelector('#appliances-tag-container');
    const ustensils = [];
    const appliances = [];
    const ingredients = [];

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
    const cardArray = [];
    cardArray.push(card.dataset.ustensils.split(','));
    cardArray.push(card.dataset.appliance);
    cardArray.push(card.dataset.ingredients.split(','));

    const tagsArray = Array.from(allTags).map((tag) => tag.id);

    const test = tagsArray.some((element) => cardArray.flat().includes(element));
    return test;
  };

  static tagSearch = (currentCards) => {
    const cardsContainer = document.querySelector('#cards-container');
    const searchWord = document.querySelector('#search-word');
    const notFound = document.querySelector('#not-found');
    const newCards = [];

    while (cardsContainer.firstChild) {
      cardsContainer.removeChild(cardsContainer.firstChild);
    }

    currentCards.forEach((card) => {
      // console.log(
      //   !card.innerText.toLowerCase().includes(searchWord.value.trim().toLowerCase()),
      //   !this.tagValidate(card),
      // );
      console.log(!this.tagValidate(card));
      if (!card.innerText.toLowerCase().includes(searchWord.value.trim().toLowerCase()
          && !this.tagValidate(card))) return;

      console.log(card);
      newCards.push(card);
      notFound.classList.add('hidden');
    });
    if (newCards.length === 0) {
      notFound.classList.remove('hidden');
      return;
    }

    newCards.forEach((card) => cardsContainer.appendChild(card));
    this.refresh(currentCards);
  };
}

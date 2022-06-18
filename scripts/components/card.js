/* eslint-disable no-console */
export default class cards {
  static init = (recipes) => {
    this.displayCards(recipes);
  };

  static displayCards = (recipes) => {
    const cardsContainer = document.querySelector('#cards-container');
    recipes.reverse().forEach((recipe) => {
      cardsContainer.insertAdjacentHTML('afterbegin', `<div id="${recipe.id}" data-ustensils="${recipe.ustensils.map((ustensil) => ustensil.toLowerCase())}" data-appliance="${recipe.appliance.toLowerCase()}" data-ingredients="${recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase())}" class="card flex flex-col w-96 h-96">
      <div class="w-full h-1/2 bg-stone-300 rounded-t-md"></div>
      <div class="flex flex-col p-5 w-full h-1/2 bg-neutral-200 rounded-b-md">
        <div class="flex flex-row justify-between mb-5">
          <p class="text-lg">${recipe.name}</p>
          <div class="flex flex-row">
            <img class="object-contain mr-1" src="./assets/horloge.png" alt="horloge">
            <span class="text-lg">${recipe.time} min</span>
          </div>
        </div>
        <div class="flex flex-row justify-between">
          <div class="flex flex-col w-1/2 text-xs">
            ${recipe.ingredients.map((element) => `<p><span class="font-bold">${element.ingredient}</span>${element.quantity ? `: ${element.quantity}` : ''} ${element.unit ? element.unit : ''}</p>`).join('')}
          </div>
          <div class="w-1/2 h-24 text-xs">
            <p class="text-ellipsis overflow-hidden h-24">${recipe.description}</p>
          </div>
        </div>
      </div>
    </div>`);
    });
  };
}

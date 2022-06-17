import tagContainers from '../components/tag-containers.js';
import recipes from "../../data/recipes.js";
import cards from "../components/card.js";
import search from "../components/search.js";
import tagSearch from "../components/tag-search.js";

const init = async () => {
  cards.init(recipes);
  tagContainers.init();
  search.init();
  tagSearch.init();
};

init();

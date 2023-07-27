import { filterPokemon } from "../../utils";
import "./ButtonFilter.css";

export const printButton = (types) => {
  types.forEach((type) => {
    const buttonType = `<button class="buttonFilter ${type}">
      ${type}
    </button>`;

    const containerFilter = document.getElementById("buttonBoxFilter");
    containerFilter.innerHTML += buttonType;
  });

  addListeners(types);
};

const addListeners = (types) => {
  types.forEach((type) => {
    const buttonType = document.querySelector(`.${type}`);
    buttonType.addEventListener("click", (e) => {
      filterPokemon(type, "type");
    });
  });
};

// const restartButton = `<button id="restartButton">All</button>`;
// const buttonAll = document.getElementById("restartButton");
// buttonAll.innerHTML = restartButton;

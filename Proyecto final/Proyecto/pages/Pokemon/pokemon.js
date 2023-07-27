import { PrintSpinner, cardsPokemon, printButton } from "../../components";
import { getPokemonById } from "../../service/pokemon.service";
import { dataPokemon, filterPokemon, paginacion } from "../../utils";
import "./pokemon.css";

const template = () => `
  <div id="pokemon">
    <div id="containerFilter">
      <div id="buttonBoxFilter"></div>
      <div id="restartButton"></div>
      <input type="text" id="inputPokemon" placeholder="Nombre Pokemon" />
    </div>
    <div id="paginacion"></div>
    <div id="galleryPokemon">
      <div id="spinnerGallery"></div>
    </div>
  </div>
`;

const dataService = async () => {
  const getData = await dataPokemon();

  const { pokemonData, type } = getData;

  cardsPokemon(pokemonData);
  printButton(type);
  document.getElementById("spinnerGallery").innerHTML = "" ;
  paginacion(pokemonData, 25);
  
};

const addListeners = () => {
  const inputPokemon = document.getElementById("inputPokemon");
  inputPokemon.addEventListener("input", (e) => {
    filterPokemon(e.target.value, "name");
  });
};

const restartButton = () => {
  const restartButton = document.getElementById("restartButton");
  restartButton.addEventListener("click",() => {
    dataService();
  })
}

export const PrintPokemonPage = () => {
  document.querySelector("main").innerHTML = template();
  PrintSpinner();
  dataService();
  addListeners();
  restartButton();
  
};

import { cardsPokemon } from "../components";
import { getPokemonById } from "../service/pokemon.service";
import { typePokemon } from "./typePokemon";

let dataGlobal;

export const dataPokemon = async () => {
  const data = [];

  for (let i = 1; i < 151; i++) {
    data.push(await getPokemonById(i));
  }
  return dataMap(data);
};

const dataMap = (data) => {
  const filterData = data.map((pokemon) => ({
    name: pokemon.name,
    imagen: pokemon.sprites.other.dream_world.front_default,
    type: pokemon.types,
    height: pokemon.height,
    weight: pokemon.weight,
    hpInicial: pokemon.stats[0].base_stat,
  }));

  const types = typePokemon(filterData);
  dataGlobal = {
    pokemonData: filterData,
    type: types,
  };

  return dataGlobal;
};

export const filterPokemon = (filterDataInputButton, donde) => {
  switch (donde) {
    case "type":
      {
        const filterData = dataGlobal.pokemonData.filter((pokemon) =>
          pokemon.type[0].type.name
            .toLowerCase()
            .includes(filterDataInputButton.toLowerCase())
        );

        if (filterData.length === 0) {
          const filterData = dataGlobal.pokemonData.filter((pokemon) =>
            pokemon.type[1]?.type.name
              .toLowerCase()
              .includes(filterDataInputButton.toLowerCase())
          );
          cardsPokemon(filterData);
        } else {
          cardsPokemon(filterData);
        }
      }
      break;

    case "name":
      {
        const filterData = dataGlobal.pokemonData.filter((pokemon) =>
          pokemon.name
            .toLowerCase()
            .includes(filterDataInputButton.toLowerCase())
        );
        cardsPokemon(filterData);
      }
      break;
  }
};

import { useEffect, useState } from "react";
import "./CodeFetchingInput.css";
import {useDebounce} from "use-debounce";


const CodeFetchingInput = () => {
  const [filter, setFilter] = useState("ditto");
  const [pokemonCollection, setPokemonCollection] = useState([]);
  const [debounceFilter] = useDebounce(filter, 500)

  useEffect(() => {
    const getPokemonFiltered = async () => {
      const pokemonList = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${filter}`
      );

      const pokemonListToJson = await pokemonList.json();

      return {
        ...pokemonListToJson,
        name: pokemonListToJson.name,
        image: pokemonListToJson.sprites.other.dream_world.front_default
      }
    };
    getPokemonFiltered().then((pokemon) => setPokemonCollection([pokemon]))
  }, [debounceFilter]);
  return (
    <>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />

      <ul>
        {pokemonCollection.map((pokemon) => (
          <li key={pokemon.name}>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default CodeFetchingInput;

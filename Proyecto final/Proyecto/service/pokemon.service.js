import { axiosUtils } from "../utils";



export const getPokemonById = async (id) => {
  const optionsRequest = {
    method: "get",
    url: `https://pokeapi.co/api/v2/pokemon/${id}`,
  };

   return await axiosUtils(optionsRequest);

};

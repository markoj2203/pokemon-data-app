export const goToPokemon = (pokemonName) => {
  return {
    type: "GO_TO_POKEMON_PAGE",
    payload: pokemonName,
  };
};

export const changeModalVisibility = (visibility) => {
  return {
    type: "MODAL_VISIBILITY",
    payload: visibility,
  };
};

export const pokemonListByType = (pokemonByType) => {
  return {
    type: "POKEMON_LIST_BY_TYPE",
    payload: pokemonByType,
  };
};

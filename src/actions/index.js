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

export const pokemonTypeName = (pokemonTypeName) => {
  return {
    type: "POKEMON_TYPE_NAME",
    payload: pokemonTypeName,
  };
};

export const pokemonTypeData = (pokemonTypeData) => {
  return {
    type: "POKEMON_TYPE_DATA",
    payload: pokemonTypeData,
  };
};

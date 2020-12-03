const goToPokemonPage = (state = {}, action) => {
  switch (action.type) {
    case "GO_TO_POKEMON_PAGE":
      return { ...state, pokemonName: action.pokemonName };
    default:
      return state;
  }
};

export default goToPokemonPage;

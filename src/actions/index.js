const goToPokemonPage = (pokemonName) => {
  return {
    type: "GO_TO_POKEMON_PAGE",
    payload: pokemonName,
  };
};

export default goToPokemonPage;

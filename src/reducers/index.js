import { combineReducers } from "redux";

const goToPokemonPage = (state = {}, action) => {
  switch (action.type) {
    case "GO_TO_POKEMON_PAGE":
      return { ...state, pokemonName: action.pokemonName };
    default:
      return state;
  }
};

const changeModalVisibility = (state = {}, action) => {
  switch (action.type) {
    case "MODAL_VISIBILITY":
      return { ...state, visibility: action.visibility };
    default:
      return state;
  }
};

const pokemonListByType = (state = {}, action) => {
  switch (action.type) {
    case "POKEMON_LIST_BY_TYPE":
      return { ...state, pokemonByType: action.pokemonByType };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  goToPokemonPage,
  changeModalVisibility,
  pokemonListByType,
});

export default rootReducer;

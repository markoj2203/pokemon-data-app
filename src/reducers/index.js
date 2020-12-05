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

const pokemonTypeName = (state = {}, action) => {
  switch (action.type) {
    case "POKEMON_TYPE_NAME":
      return { ...state, pokemonTypeName: action.pokemonTypeName };
    default:
      return state;
  }
};

const pokemonTypeData = (state = {}, action) => {
  switch (action.type) {
    case "POKEMON_TYPE_DATA":
      return { ...state, pokemonTypeData: action.pokemonTypeData };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  goToPokemonPage,
  changeModalVisibility,
  pokemonTypeName,
  pokemonTypeData,
});

export default rootReducer;

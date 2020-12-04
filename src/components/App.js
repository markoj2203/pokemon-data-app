import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Content from "./Content";
import Header from "./Header";
import Modal from "react-modal";
import axios from "axios";
import capitalizeFirstLetter from "../functions/main";

Modal.setAppElement("#root");

function App() {
  const visibility = useSelector(
    (state) => state.changeModalVisibility.visibility
  );

  const pokemonType = useSelector(
    (state) => state.pokemonListByType.pokemonByType
  );

  const [pokemonTypeData, setPokemonTypeData] = useState([]);

  useEffect(() => {
    if (visibility !== undefined && visibility !== false) {
      let arrData = [];
      async function getPokemonByType() {
        await axios
          .get(`https://pokeapi.co/api/v2/type/${pokemonType}/`)
          .then((result) => {
            result.data.pokemon.map((item) => {
              async function getPokemonData() {
                await axios.get(item.pokemon.url).then((result) => {
                  arrData.push(result.data);
                });
              }
              getPokemonData();
            });
          });
      }
      setPokemonTypeData(arrData);
      getPokemonByType();
    }
  }, [pokemonType]);

  const dispatch = useDispatch();

  return (
    <div className="container-fluid">
      <Header />
      <Content />
      <Modal
        isOpen={visibility}
        onRequestClose={() =>
          dispatch({
            type: "MODAL_VISIBILITY",
            visibility: false,
          })
        }
      >
        {pokemonType === undefined ? (
          ""
        ) : (
          <h1>
            Pokemon List By Type: <b>{capitalizeFirstLetter(pokemonType)}</b>
          </h1>
        )}

        <div className="row" style={{ justifyContent: "center" }}>
          {pokemonTypeData.map((item, i) => (
            <div
              key={i}
              className="card"
              style={{ width: "16rem", margin: "1%" }}
            >
              <img
                className="card-img-top"
                src={item.sprites.front_default}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">
                  {capitalizeFirstLetter(item.name)}
                </h5>
                <p className="card-text">
                  Name: <b>{item.name}</b>
                </p>
                <p className="card-text">
                  Height: <b>{item.height}</b>
                </p>
                <p className="card-text">
                  Weight: <b>{item.weight}</b>
                </p>
                <p className="card-text">
                  Abilities:{" "}
                  {item.abilities.map((ability, i) => {
                    if (item.abilities.length === i + 1) {
                      return (
                        <span key={i}>
                          <b>{ability.ability.name}</b>
                        </span>
                      );
                    } else {
                      return (
                        <span key={i}>
                          <b>{ability.ability.name + ", "}</b>
                        </span>
                      );
                    }
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div></div>
      </Modal>
    </div>
  );
}

export default App;

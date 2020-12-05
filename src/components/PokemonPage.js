import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import capitalizeFirstLetter from "../functions/main";
import Spinner from "./Spinner";

export default function PokemonPage() {
  const pokemonName = useSelector((state) => state.goToPokemonPage.pokemonName);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pokemonTypeData, setPokemonTypeData] = useState([]);

  const pokName =
    pokemonName !== undefined
      ? pokemonName
      : localStorage.getItem("pokemonName");

  const dispatch = useDispatch();

  const getPokemonByType = async (pokemonType) => {
    let arrData = [];
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
    setPokemonTypeData(arrData);
  };

  const triggerModal = (visibiity, pokemonType) => {
    getPokemonByType(pokemonType);

    dispatch({
      type: "MODAL_VISIBILITY",
      visibility: visibiity,
    });

    dispatch({
      type: "POKEMON_TYPE_NAME",
      pokemonTypeName: pokemonType,
    });

    dispatch({
      type: "POKEMON_TYPE_DATA",
      pokemonTypeData: pokemonTypeData,
    });
  };

  const getPokemonData = async () => {
    try {
      setLoading(true);
      let arrData = [];
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokName}/`)
        .then((result) => {
          arrData.push(result.data);
        });
      setData(arrData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPokemonData();
  }, [pokName]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "30%",
      }}
    >
      {loading === false ? (
        data.map((item, i) => (
          <div key={i} className="card" style={{ width: "100%" }}>
            <img
              className="card-img-top"
              src={item.sprites.front_default}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">{capitalizeFirstLetter(item.name)}</h5>
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
              <p className="card-text">
                Types:{" "}
                {item.types.map((type, i) => (
                  <button
                    key={i}
                    type="button"
                    className="btn btn-outline-dark"
                    style={{ margin: "1%" }}
                    onClick={() => triggerModal(true, type.type.name)}
                  >
                    {type.type.name}
                  </button>
                ))}
              </p>
            </div>
          </div>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
}

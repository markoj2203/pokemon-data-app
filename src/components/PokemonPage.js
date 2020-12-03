import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import capitalizeFirstLetter from "../functions/main";

export default function PokemonPage() {
  const pokemonName = useSelector((state) => state.pokemonName);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getPokemonData() {
      let arrData = [];
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
        .then((result) => {
          console.log(result.data);
          arrData.push(result.data);
        });
      setData(arrData);
    }
    getPokemonData();
  }, [pokemonName]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "30%",
      }}
    >
      {data.map((item, i) => (
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
                    <span>
                      <b>{ability.ability.name}</b>
                    </span>
                  );
                } else {
                  return (
                    <span>
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
                  class="btn btn-outline-dark"
                  style={{ margin: "1%" }}
                >
                  {type.type.name}
                </button>
              ))}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

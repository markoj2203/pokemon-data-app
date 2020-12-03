import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Content() {
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const goToPokemonPage = (pokemonName) => {
    dispatch({
      type: "GO_TO_POKEMON_PAGE",
      pokemonName: pokemonName,
    });
  };

  useEffect(() => {
    async function getData() {
      await axios
        .get(
          `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
        )
        .then((result) => {
          let arrData = result.data.results;
          setData(arrData);
        });
    }
    getData();
  }, [limit, offset]);

  return (
    <div style={{ width: "50%" }}>
      <div className="list-div" style={{ width: "100%" }}>
        <ul className="list-group">
          {data.map((item, i) => (
            <li key={i} className="list-group-item">
              <span style={{ float: "left" }}>{i + 1}</span>
              <Link onClick={() => goToPokemonPage(item.name)} to="/pokemon">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ textAlign: "center" }}>
        <button type="button" class="btn btn-primary" style={{ margin: "2%" }}>
          Load more...
        </button>
        <button type="button" class="btn btn-danger" style={{ margin: "2%" }}>
          Load All
        </button>
      </div>
    </div>
  );
}

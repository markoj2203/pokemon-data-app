import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

export default function Content() {
  const [limit, setLimit] = useState(20);
  const [maxCount, setMaxCount] = useState(0);
  const [data, setData] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [abilityList, setAbilityList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchByType, setSearchByType] = useState("");
  const [searchByAbility, setSearchByAbility] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const goToPokemonPage = (pokemonName) => {
    dispatch({
      type: "GO_TO_POKEMON_PAGE",
      pokemonName: pokemonName,
    });
  };

  const searchByWord = (event) => {
    setSearchTerm(event.target.value);
  };

  const changeByType = (event) => {
    setSearchByType(event.target.value);
  };

  const changeByAbility = (event) => {
    setSearchByAbility(event.target.value);
  };

  //Load 20 more pokemon
  const loadMoreData = () => {
    setLoading(true);
    setLimit(limit + 20);
    setLoading(false);
  };

  //Load all pokemons
  const loadAllData = async () => {
    try {
      setLoading(true);
      await axios.get(`https://pokeapi.co/api/v2/pokemon/`).then((result) => {
        let count = result.data.count;
        setMaxCount(count);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Load pokemon by type
  const getDataByType = async () => {
    try {
      setLoading(true);
      let arrData = [];
      await axios
        .get(`https://pokeapi.co/api/v2/type/${searchByType}`)
        .then((result) => {
          //console.log(result.data.pokemon);
          result.data.pokemon.map((item) => arrData.push(item.pokemon));
        });
      setData(arrData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  //Load pokemon by ability
  const getDataByAbility = async () => {
    try {
      setLoading(true);
      let arrData = [];
      await axios
        .get(`https://pokeapi.co/api/v2/ability/${searchByAbility}`)
        .then((result) => {
          //console.log(result.data.pokemon);
          result.data.pokemon.map((item) => arrData.push(item.pokemon));
        });
      setData(arrData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  //Load list of pokemons
  const getData = async () => {
    try {
      setLoading(true);
      await axios
        .get(
          `https://pokeapi.co/api/v2/pokemon/?limit=${
            maxCount !== 0 ? maxCount : limit
          }&offset=0`
        )
        .then((result) => {
          let arrData = result.data.results;
          setData(arrData);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //Get Type List
  const getTypeList = async () => {
    try {
      await axios.get(`https://pokeapi.co/api/v2/type/`).then((result) => {
        let arrData = result.data.results;
        setTypeList(arrData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Get Ability List
  const getAbilityList = async () => {
    try {
      await axios.get(`https://pokeapi.co/api/v2/ability/`).then((result) => {
        let arrData = result.data.results;
        setAbilityList(arrData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      searchByType === " " ||
      searchByType === "" ||
      searchByType === undefined ||
      searchByType === "Filter by Type"
    ) {
      getData();
    } else {
      getDataByType();
    }
  }, [searchByType]);

  useEffect(() => {
    if (
      searchByAbility === " " ||
      searchByAbility === "" ||
      searchByAbility === undefined ||
      searchByAbility === "Filter by Ability"
    ) {
      getData();
    } else {
      getDataByAbility();
    }
  }, [searchByAbility]);

  useEffect(() => {
    getData();
  }, [limit, maxCount]);

  useEffect(() => {
    getTypeList();
    getAbilityList();
  }, []);

  useEffect(() => {
    let result = data.filter(function (e) {
      if (e.name.includes(searchTerm)) {
        return e.name;
      }
    });
    if (searchTerm !== "") {
      setData(result);
    } else {
      getData();
    }
  }, [searchTerm]);

  return (
    <div style={{ width: "50%" }}>
      <div style={{ width: "100%" }}>
        <nav
          className="navbar navbar-light bg-light"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <form className="form-inline" style={{ width: "50%" }}>
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={searchByWord}
              style={{ width: "100%" }}
            />
            <div
              className="col-sm-6"
              style={{ textAlign: "center", marginTop: "2%" }}
            >
              <select
                className="selectUp form-control"
                id="typeID"
                onChange={changeByType}
              >
                <option>Filter by Type</option>
                {typeList.map((item, i) => (
                  <option key={i}>{item.name}</option>
                ))}
              </select>
            </div>

            <div
              className="col-sm-6"
              style={{ textAlign: "center", marginTop: "2%" }}
            >
              <select
                className="selectUp form-control"
                id="typeID"
                onChange={changeByAbility}
              >
                <option>Filter by Ability</option>
                {abilityList.map((item, i) => (
                  <option key={i}>{item.name}</option>
                ))}
              </select>
            </div>
          </form>
        </nav>
      </div>
      {loading === false ? (
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
      ) : (
        <Spinner />
      )}
      <div style={{ textAlign: "center" }}>
        <button
          type="button"
          className="btn btn-primary"
          style={{ margin: "2%" }}
          onClick={loadMoreData}
        >
          Load more...
        </button>
        <button
          type="button"
          className="btn btn-danger"
          style={{ margin: "2%" }}
          onClick={() => loadAllData()}
        >
          Load All
        </button>
      </div>
    </div>
  );
}

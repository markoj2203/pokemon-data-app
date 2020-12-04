import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Content() {
  const [limit, setLimit] = useState(20);
  const [maxCount, setMaxCount] = useState(0);
  const [data, setData] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [abilityList, setAbilityList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchByType, setSearchByType] = useState("");
  const [searchByAbility, setSearchByAbility] = useState("");

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

  const loadMoreData = () => {
    setLimit(limit + 20);
  };

  const loadAllData = () => {
    async function getMaxCount() {
      await axios.get(`https://pokeapi.co/api/v2/pokemon/`).then((result) => {
        let count = result.data.count;
        setMaxCount(count);
      });
    }
    getMaxCount();
  };

  async function getDataByType() {
    let arrData = [];
    await axios
      .get(`https://pokeapi.co/api/v2/type/${searchByType}`)
      .then((result) => {
        //console.log(result.data.pokemon);
        result.data.pokemon.map((item) => arrData.push(item.pokemon));
      });
    setData(arrData);
  }

  async function getDataByAbility() {
    let arrData = [];
    await axios
      .get(`https://pokeapi.co/api/v2/ability/${searchByAbility}`)
      .then((result) => {
        //console.log(result.data.pokemon);
        result.data.pokemon.map((item) => arrData.push(item.pokemon));
      });
    setData(arrData);
  }

  async function getData() {
    await axios
      .get(
        `https://pokeapi.co/api/v2/pokemon/?limit=${
          maxCount !== 0 ? maxCount : limit
        }&offset=0`
      )
      .then((result) => {
        let arrData = result.data.results;
        setData(arrData);
      });
  }

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
    //Get Type List
    async function getTypeList() {
      await axios.get(`https://pokeapi.co/api/v2/type/`).then((result) => {
        let arrData = result.data.results;
        setTypeList(arrData);
      });
    }
    getTypeList();
  }, []);

  useEffect(() => {
    //Get Ability List
    async function getAbilityList() {
      await axios.get(`https://pokeapi.co/api/v2/ability/`).then((result) => {
        let arrData = result.data.results;
        setAbilityList(arrData);
      });
    }
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

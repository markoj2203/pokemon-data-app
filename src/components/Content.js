import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Content() {
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);

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
    <Router>
      <div className="content flex-center">
        <div className="list-div">
          <ul className="list-group">
            {data.map((item, i) => (
              <li key={i} className="list-group-item">
                <span style={{ float: "left" }}>{i + 1}</span>
                <Link to={`/pokemon?name=${item.name}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Router>
  );
}

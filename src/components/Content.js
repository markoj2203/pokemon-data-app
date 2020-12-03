import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PokemonPage from "./PokemonPage";
import Home from "./Home";

export default function Content() {
  return (
    <Router>
      <div
        className="row"
        style={{
          justifyContent: "center",
          paddingTop: "5%",
          paddingBottom: "5%",
        }}
      >
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/pokemon">
            <PokemonPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import capitalizeFirstLetter from "../functions/main";

export default function Header() {
  const pokemonName = useSelector((state) => state.goToPokemonPage.pokemonName);
  const [headText, setHeadText] = useState("Pokemon List");

  useEffect(() => {
    const headText =
      pokemonName === undefined
        ? "Pokemon List"
        : "Pokemon: " + capitalizeFirstLetter(pokemonName);

    setHeadText(headText);
  }, [pokemonName]);

  return (
    <div className="row" style={{ justifyContent: "center" }}>
      <h2>{headText}</h2>
    </div>
  );
}

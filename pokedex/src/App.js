import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "../src/components/card";

import api from "./services/api";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [offSet, setOffSet] = useState(0);

  function getData() {
    api
      .get(`https://pokeapi.co/api/v2/pokemon?limit=15&offset=${offSet}`)
      .then((response) => setPokemon(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
      
  }

  useEffect(() => {
    getData();
    console.log(pokemon)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offSet]);

  return (
    <div className="App">
      <header className="">
        <h1 id="title">Pokedex</h1>
        <ul className="pokedex">
          {pokemon.map((pokemon) => {
            return(
              <Card key={pokemon.id} />
            ); 
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;

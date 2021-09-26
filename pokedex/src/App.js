import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "../src/components/card";

function App() {  
  const [pokemons, setPokemons] = useState([]);
  const [offSet, setOffSet] = useState(0);

  async function getData() {
    const baseUrl = "https://pokeapi.co/api/v2/";

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${baseUrl}pokemon?limit=15&offset=${offSet}`,
        requestOptions
      );

      const data = await response.json();

      return data.results.map((results) => results.url);
    } catch (error) {
      console.error("ops! ocorreu um erro" + error);
    }
  }

  async function getPokemonData(urls) {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const arrayPokemon = [];

    for await (let url of urls) {
      try {
        const listResponse = await fetch(url, requestOptions);

        const listData = await listResponse.json();

        console.log(listData);
        arrayPokemon.push(listData);
      } catch (error) {
        console.error("ops! ocorreu um erro" + error);
      }
      // arrayPokemon.push(listData)
      // console.log(arrayPokemon);
    }

    setPokemons([...pokemons, ...arrayPokemon]);
  }

  useEffect(async () => {
    const urls = await getData();
    console.log(urls);
    await getPokemonData(urls);
  }, [offSet]);

  return (
    <div className="container">
      <header className="">
        <h1 id="title">Pokedex</h1>
      </header>
        <ul className="pokedex">
          {pokemons.map((pokemon) => {
            return <Card pokemon={pokemon} />;
          })}
        </ul>
      
    </div>
  );
}

export default App;

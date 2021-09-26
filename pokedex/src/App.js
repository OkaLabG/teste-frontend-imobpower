import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "../src/components/card";

function App() {
  const [urls, setUrls] = useState([]);
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
      
      const newUrls = data.results.map(results => results.url)
      console.log(newUrls);
      setUrls(urls => [...urls,newUrls]);
      console.log(urls);
    } catch (error) {
      console.error("ops! ocorreu um erro" + error);
    }
  }

  async function getPokemonData() {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const arrayPokemon = [];

    for await (let url of urls) {      
      url = urls.result.url;
      console.log(url);

      try {
        const listResponse = await fetch(url, requestOptions);

        const listData = await listResponse.json();

        console.log(listData);
      } catch (error) {
        console.error("ops! ocorreu um erro" + error);
      }
      // arrayPokemon.push(listData)
      // console.log(arrayPokemon);
    }

    //setPokemons(arrayPokemon)
  }

  useEffect(() => {
    getData();
    getPokemonData();
  }, []);

  return (
    <div className="App">
      <header className="">
        <h1 id="title">Pokedex</h1>
        <ul className="pokedex">
          {pokemons.map((pokemon) => {
            return <Card pokemons={pokemons} />;
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;

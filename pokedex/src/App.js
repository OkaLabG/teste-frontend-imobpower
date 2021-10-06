import React, { useState, useEffect } from "react";

import "./App.css";

import Card from "../src/components/Card";
import Loader from "../src/components/Loader";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [offSetPage, setOffSetPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const baseUrl = "https://pokeapi.co/api/v2/";
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  async function getData() {
    try {
      const response = await fetch(
        `${baseUrl}pokemon?limit=15&offset=${offSetPage}`,
        requestOptions
      );

      const data = await response.json();

      return data.results.map((results) => results.url);
    } catch (error) {
      console.error("ops! ocorreu um erro" + error);
    }
  }

  async function getPokemonData(urls) {
    const arrayPokemon = [];

    for (let url of urls) {
      try {
        const listResponse = await fetch(url, requestOptions);

        const listData = await listResponse.json();

        console.log(listData);
        arrayPokemon.push(listData);
      } catch (error) {
        console.error("ops! ocorreu um erro" + error);
      }
    }

    setPokemons([...pokemons, ...arrayPokemon]);
  }

  async function loadData(offSetPage) {
    const urls = await getData(offSetPage);
    console.log(urls);
    await getPokemonData(urls);
    setLoading(false);
    window.navigator.vibrate([200]);
  }

  function handleNextPage() {
    setLoading(true);
    setPokemons([]);
    setOffSetPage(offSetPage + 15);
    //console.log(offSetPage);
  }

  function handlePreviousPage() {
    if (offSetPage !== 0) {
      setLoading(true);
      setPokemons([]);
      setOffSetPage(offSetPage - 15);
      //console.log(offSetPage);
    }
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offSetPage]);

  return (
    <main className="container">
      <header className="">
        <h1 id="title">Pokedex</h1>
        <nav>
          <button className="button" onClick={handlePreviousPage}>
            Previous
          </button>
          <button className="button" onClick={handleNextPage}>
            Next
          </button>
        </nav>
      </header>
      {loading ? <Loader /> : <></>}

      <ul className="pokedex">
        {pokemons.map((pokemon) => {
          return <Card key={pokemon.name} pokemon={pokemon} />;
        })}
      </ul>

      {!loading ? (
        <footer>
          <button className="button" onClick={handlePreviousPage}>
            Previous
          </button>
          <button className="button" onClick={handleNextPage}>
            Next
          </button>
        </footer>
      ) : (
        <></>
      )}
    </main>
  );
}

export default App;

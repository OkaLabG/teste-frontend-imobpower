import { useCallback, useContext, useEffect, useState } from "react";
import { GetPokemons, GetPokemonsData, SearchPokemon } from "./api";
import Navbar from "./components/Navbar";
import Pokedex from "./components/Pokedex";
import Searchbar from "./components/Searchbar";
import FavoriteContext from "./context/favoritesContext";

const favoritesKey = "f";
const itensPerPage = 60; //Quantidade de pokemons por página

const MainPage = () => {
  const [page, setPage] = useState(0); // Página em que o usuário esta no momento
  const [totalPages, setTotalPages] = useState(0); // Total de páginas
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false); // Carregando até puxar os pokemons na tela
  const [pokemons, setPokemons] = useState([]); //Inicia o array vázio, aqui é a lista dos pokemons

  const { FavoritePokemons } = useContext(FavoriteContext);

  const fetchPokemons = useCallback( async () => {
    try {
      setLoading(true);
      setNotFound(false);
      const data = await GetPokemons(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await GetPokemonsData(pokemon.url);
      });

      const results = await Promise.all(promises); // Pega todas as promessas e só libera depois de ter todas p rontas
      setPokemons(results);
      setLoading(false);
      setTotalPages(Math.ceil(data.count / itensPerPage));
    } catch (error) {
      console.log("fetchPokemons error: ", error);
    }
  }, [page])

  // const loadFavoritePokemons = useCallback(() => {
  //   const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || [];
  //   setFavorites(pokemons);
  // }, [])

  const onSearchHandler = async (pokemon) => {
    if (!pokemon) {
      fetchPokemons();
      return;
    }
    setLoading(true);
    setNotFound(false);
    const result = await SearchPokemon(pokemon);
    if (!result) {
      setNotFound(true);
    } else {
      setPokemons([result]);
      setPage(0);
      setTotalPages(1);
    }
    setLoading(false);
  };

	useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

	// useEffect(() => {
  //   loadFavoritePokemons();
  // }, [loadFavoritePokemons]);

  return (
    <>
      <div>
        <Navbar />
        <Searchbar onSearch={onSearchHandler} />
        {notFound ? (
          <div className="not-found-text"> Este pokemon não existe</div>
        ) : (
          <Pokedex
            pokemons={pokemons}
            loading={loading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        )}
      </div>
      <div className="favorite-pokemons">
        Favoritos | {FavoritePokemons.length} ❤️
      </div>
    </>
  );
};

export default MainPage;

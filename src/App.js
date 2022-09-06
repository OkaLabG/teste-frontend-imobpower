import React, { useMemo, useState } from "react";
import "./App.css";
import { FavoriteProvider } from "./context/favoritesContext";
import MainPage from "./MainPage";

const favoritesKey = "f";
function App() {
  const [favoriteState, setFavoriteState] = useState(JSON.parse(localStorage.getItem(favoritesKey)) || [])


  //Colocar e atualiar pokemons na parte dos favoritos
  const updateFavoritePokemons = (name) => {
    const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || []
    console.log(name);

    if(favorites.includes(name)){
      let newFavorites = favorites.filter(fav => fav !== name)
      localStorage.setItem(favoritesKey, JSON.stringify(newFavorites));
      setFavoriteState(newFavorites)
    } else {
      favorites.push(name)
      localStorage.setItem(favoritesKey, JSON.stringify(favorites));
      setFavoriteState(favorites)
    }
  };
 
  return (
    <FavoriteProvider
      value={{
        FavoritePokemons: favoriteState,
        updateFavoritePokemons: updateFavoritePokemons,
      }}
    >
      <MainPage/>
    </FavoriteProvider>
  );
}

//Exportando o método para ser usado
export default App;

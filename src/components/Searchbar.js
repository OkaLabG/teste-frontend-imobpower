import React, { useContext } from "react";
import { useState } from "react";
import FavoriteContext from "../context/favoritesContext";
//Searchbar.js, aqui contém toda parte de pesquisa de pokemon.

const Searchbar = ({onSearch}) => {
  const [search, setSearch] = useState("dito"); //Definindo o useState para o React considerar uma alteração importante a ser executada
  const { FavoritePokemons } = useContext(FavoriteContext);

  //Ao clicar no botão de pesquisa, ele faz a chamada abaixo
  const onChange = (e) => {
    console.log("Pokemon: ", e.target.value);
    setSearch(e.target.value);
    if(e.target.value.length === 0){
        onSearch(undefined)
    }
  };

  const onButtonClick = () => {
    onSearch(search);
  };
  //Input de pesquisa para procurar o pokemno pelo nome
  return (
    <div className="searchbar-container">
      <div className="searchbar-label">
        Encontre um Pokémon
      </div>
      <div className="searchbar-input-container">
        <input className="searchbar" placeholder="Digite um nome..." onChange={onChange} />
        <button className="searchbar-btn" onClick={onButtonClick}>Buscar</button>
      </div>
    </div>
  );
};

//Exportando a função
export default Searchbar;

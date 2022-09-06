import React, { useContext } from "react";
import FavoriteContext from "../context/favoritesContext";

//Criando função para retornar a parte HTML do component
const Navbar = () => {
  
  const pokedex_logo = "https://pokeportuga.pt/img/pokedex/Pt_dex.png";
  return (
    <header className="header-style">
      {/* <div> */}
        {/* <img className="navbar-img" src={pokedex_logo} alt="Pokedex-logo" /> */}
      {/* </div> */}
      <div className="pokedex-text-name">POKEDEX</div>
    </header>
  );
};

//Exportando a função
export default Navbar;

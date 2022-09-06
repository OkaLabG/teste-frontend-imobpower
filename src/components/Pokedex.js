import React from "react";
import Pagination from "./Pagination";
import Pokemon from "./Pokemon";

const Pokedex = (props) => {
  const { pokemons, loading, page, setPage, totalPages } = props;
  const onLeftClickHandler = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const onRightHandler = () => {
    if (page + 1 !== totalPages) {
      setPage(page + 1);
    }
  };
  return (
    <div className="container">
      <div className="pokedex-header">
        <Pagination
          page={page + 1}
          totalPages={totalPages}
          onLeftClick={onLeftClickHandler}
          onRightClick={onRightHandler}
        />
      </div>

      {/* Aqui estamos passando para pokedex todos os pokemons e se estão carregando ou não */}
      {loading ? (
        <div>Carregando, aguarde treinador...</div>
      ) : (
        <div className="pokedex-grid">
          {/* Aqui fazemos o .map passar por todos os objetos da lista e vai chamar a função*/}
          {pokemons &&
            pokemons.map((pokemon, index) => {
              return (
                <Pokemon key={index} pokemon={pokemon} /> //Todo elemento de uma lista é colocado o "key"
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Pokedex;

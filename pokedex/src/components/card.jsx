function Card({pokemons}) {
  const elementTypes = pokemons.types.map(typeInfo => typeInfo.type.name);
  
  return(    
    <li key={pokemons.name} className={`card ${elementTypes[0]}`}>
      <img className="card-image" 
        alt={pokemons.name}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemons.id}.png`}
      />
        <h2 className="card-title">${pokemons.id}. ${pokemons.name}</h2>
        <p className="card-subtitle">
          ${elementTypes.join(' | ')}
        </p>
    </li>
  )
}

export default Card;
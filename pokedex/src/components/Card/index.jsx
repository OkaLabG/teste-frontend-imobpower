function Card({pokemon}) {
  const elementTypes = pokemon.types.map(typeInfo => typeInfo.type.name);
  
  return(    
    <li className={`card ${elementTypes[0]}`}>
      <img className="card-image" 
        alt={pokemon.name}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
      />
        <h2 className="card-title">{pokemon.id}. {pokemon.name}</h2>
        <p className="card-subtitle">
          {elementTypes.join(' | ')}
        </p>
    </li>
  )
}

export default Card;
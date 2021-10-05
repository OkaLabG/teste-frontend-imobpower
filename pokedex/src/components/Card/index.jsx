function Card({pokemon}) {
  const elementTypes = pokemon.types.map(typeInfo => typeInfo.type.name);
  let twoElements;
  if (elementTypes.length > 1){
    twoElements = true;
    console.log(twoElements);
  } else {
    twoElements = false;
    console.log(twoElements);
  }

  return(    
    <li className={`card ${elementTypes[0]}`}>
      <img className="card-image" 
        alt={pokemon.name}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
      />
        <h2 className="card-title">{pokemon.id}. {pokemon.name}</h2>
        <p className="card-subtitle">          
          { !twoElements
            ? 
              <>
                <span className={
                  `element span-${elementTypes[0]}`}
                >
                  {elementTypes[0]}
                </span>
              </>                            
            :
              <>
                <span className={
                  `elementOne span-${elementTypes[0]}`}
                >
                  {elementTypes[0]} 
                </span>                
                <span className={
                  `elementTwo span-${elementTypes[1]}`}
                >
                  {elementTypes[1]}
                </span>
              </>
              
          } 
        </p>
    </li>
  )
}

export default Card;
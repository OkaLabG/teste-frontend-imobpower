import React from 'react';
import { Pokemon } from '../../types/pokemon';
import PokeCard from '../PokeCard';
import './styles.scss'

interface Props {
    data: Pokemon[]
}
function ListPokeCard({ data }: Props) {
    console.log(data.length)
    return (
        <div className='grid-container'>
            {data.map((pokemon, index) => {
                return <PokeCard key={index} id={pokemon.id} name={pokemon.name} weight={pokemon.weight} sprites={pokemon.sprites} types={pokemon.types}  />
            })}
        </div>
    );
}

export default ListPokeCard;

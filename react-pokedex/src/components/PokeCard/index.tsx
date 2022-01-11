import React from 'react';
import { Pokemon } from '../../types/pokemon';
import './styles.scss';



const PokeCard = ({ id, name, weight, sprites, types }: Pokemon) => {
    console.log(types[0].type.name)
    return (
        <div className={`${types[0].type.name} container-card`}>
            <div className='card-img'>
                <img src={sprites.front_default} alt='pokemon'/>
            </div>
            <div className='container-config'>
                <div className='card-info'>
                    <div className='card-id'>
                        {`${id}°`}
                    </div>
                    <div className='card-name'>
                        {name}
                    </div>
                </div>

                <div className='card-type'>
                    {types.map((name) => {
                        return <p>{name.type.name}</p>
                    })}
                </div>
            </div>

        </div>
    );

}

export default PokeCard;

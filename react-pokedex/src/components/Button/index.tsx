import React from 'react';

import './styles.scss';

const Button = ({ next, previous }: any) => {
    return (
        <div className='container-btn'>
            <button className='btn' onClick={previous}>Anterior</button>
            <button className='btn' onClick={next} >Próximo</button>
        </div>
    );
}
export default Button;

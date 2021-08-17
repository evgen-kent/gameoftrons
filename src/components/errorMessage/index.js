import React from 'react';
import './style.css';
import img from './got.jpeg';

const ErrorMessage = () => {
    return (
        <>
            <img src={img} alt= 'error'></img>
            <span>Something goes wrong</span>
        </>
    )
}

export default ErrorMessage;
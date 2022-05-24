import React from "react";
import style from '../../src/App.module.css';

function Coin({ name, icon, price, symbol }) {
    return (
        <div className={style.coin}>
            <h2> Name: {name}</h2>
            <img src={icon} alt="CryptoLogo"/>
            <h3> Price: {price}</h3>
            <h3> Symbol: {symbol}</h3>
        </div>
    );
}

export default Coin;
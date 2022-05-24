import React from 'react';
import {useState, useEffect} from 'react';
import style from './App.module.css';
import careWallet from './careWallet.png';
import Axios from 'axios';
import Coin from './components/coin'

const DisplayHomePage = () => {
    const [listOfCoins, setListOfCoins] = useState([]);

    useEffect(() => {
        Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
          (response) => {
              console.log(response);
            setListOfCoins(response.data.coins);
          }
        );
      }, []);
      

    return (
        <div className={style.home}>
            <div className={style.pic}>
                <img src={careWallet} alt="Care Wallet Logo" height={700} width={700} />
                <div className={style.cryptoCard}>
                    {listOfCoins.slice(0, 6).map((coin) => {
                        return (
                            <Coin key={coin.id}
                                name={coin.name}
                                icon={coin.icon}
                                price={coin.price}
                                symbol={coin.symbol}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
export default DisplayHomePage;
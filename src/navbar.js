import React from 'react';
import {Link} from "react-router-dom";
import styles from './App.module.css'

const navbar = () =>{
    return(
        <nav className={styles.navbar}>
            <h2>Care Wallet</h2>
            <ul>
                <li>
                    <Link to='/Home' className={styles.menu}>Home</Link>
                </li>
                <li>
                    <Link to='/Wallet' className={styles.menu}>Try The Demo</Link>
                </li>
            </ul>
        </nav>
    );

}
export default navbar;
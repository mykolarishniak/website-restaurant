import React from 'react';
import { Link } from "react-router-dom";
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
       <Link to="/" className={styles.logo}>
        UzhRestaurant
      </Link>
      <nav className={styles.nav}>
        <a href="#">Про нас</a>
        <a href="#">Ціни</a>
        <a href="#">Контакти</a>
      </nav>
      <div className={styles.actions}>
        <Link to="/login" className={styles.login}>Увійти</Link>
        <Link to="/register" className={styles.signup}>Зареєструватися</Link>
      </div>
    </header>
  )
}
export default Header;

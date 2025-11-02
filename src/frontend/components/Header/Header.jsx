import React from 'react'
import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>UzhRestaurant</div>
      <nav className={styles.nav}>
        <a href="#">Про нас</a>
        <a href="#">Ціни</a>
        <a href="#">Контакти</a>
      </nav>
      <div className={styles.actions}>
        <button className={styles.login}>Увійти</button>
        <button className={styles.signup}>Зареєструватися</button>
      </div>
    </header>
  )
}

export default Header

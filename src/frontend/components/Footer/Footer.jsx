import React from 'react'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <h3>UzhRestaurant</h3>
      </div>
      <div>
        <h4>Навігація</h4>
        <p>Головна</p>
        <p>Про нас</p>
        <p>Контакти</p>
      </div>
      <div>
        <h4>Соціальні мережі</h4>
        <p>Instagram</p>
        <p>Facebook</p>
        <p>Twitter</p>
      </div>
    </footer>
  )
}

export default Footer

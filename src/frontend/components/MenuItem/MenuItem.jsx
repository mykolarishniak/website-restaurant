import React from 'react';
import styles from './MenuItem.module.css';

function MenuItem({ title, price, imgSrc }) {
  return (
    <div className={styles.card}>
      <div className={styles['img-container']}>
        <img src={imgSrc} alt={title} className={styles.img} />
      </div>
      <div className={styles.details}>
        <p className={styles.title}>{title}</p>
        <p className={styles.price}>{price}</p>
        <button className={styles.button}>Замовити</button>
      </div>
    </div>
  );
}

export default MenuItem;

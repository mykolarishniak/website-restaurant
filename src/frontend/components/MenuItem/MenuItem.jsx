import React, { useContext }  from 'react';
import styles from './MenuItem.module.css';
import { CartContext } from '../../context/CartContext';

function MenuItem({ item }) {
  const { addToCart } = useContext(CartContext);

  const handleOrder = () => {

    const success = addToCart(item);

    if (success === false) {
    } else {
        alert(`${item.title} успішно додано до кошика!`);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles['img-container']}>
        <img src={item.imgSrc} alt={item.title} className={styles.img} />
      </div>
      <div className={styles.details}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.price}>{item.price} грн</p>
        <button className={styles.button} onClick={handleOrder}>Замовити</button>
      </div>
    </div>
  );
}

export default MenuItem;

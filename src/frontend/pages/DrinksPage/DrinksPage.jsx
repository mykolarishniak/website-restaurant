import React from 'react';
import Header from '../../components/Header/Header';
import MenuItem from '../../components/MenuItem/MenuItem';
import styles from './DrinksPage.module.css';

import classicmojito from '../../../assets/images/classismojito.png';
import mulledWine from '../../../assets/images/mulledwine.png';
import lemonade from '../../../assets/images/lemonade.png';
import longIsland from '../../../assets/images/longisland.png';
import mojito from '../../../assets/images/mojito.png';
import ginTonic from '../../../assets/images/gintonic.png';

const drinksData = [
  { title: 'Мохіто класичний', price: '85 грн.', imgSrc: classicmojito },
  { title: 'Глінтвейн', price: '90 грн.', imgSrc: mulledWine },
  { title: 'Лимонад', price: '70 грн.', imgSrc: lemonade },
  { title: 'Long Island', price: '90 грн.', imgSrc: longIsland },
  { title: 'Мохіто', price: '80 грн.', imgSrc: mojito },
  { title: 'Джин-тонік', price: '90 грн.', imgSrc: ginTonic },
];

function DrinksPage() {
  return (
    <>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Напої</h1>
        <div className={styles.gridContainer}>
          {drinksData.map((drink, index) => (
            <MenuItem
              key={index}
              title={drink.title}
              price={drink.price}
              imgSrc={drink.imgSrc}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default DrinksPage;

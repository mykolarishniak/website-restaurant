import React from 'react'
import { useNavigate } from "react-router-dom";
import styles from './Categories.module.css'
import salad from '../../../assets/images/salad.png'
import soup from '../../../assets/images/soup.png'
import main from '../../../assets/images/main.png'
import grill from '../../../assets/images/grill.png'
import drink from '../../../assets/images/drinks.png'
import dessert from '../../../assets/images/dessert.png'

const categories = [
  { title: 'Салати', img: salad, path: "/category/salads" },
  { title: 'Супи', img: soup, path: "/category/soups" },
  { title: 'Основні страви', img: main, path: "/category/main" },
  { title: 'Гарніри', img: grill, path: "/category/sides" },
  { title: 'Напої', img: drink, path: "/category/drinks" },
  { title: 'Десерти', img: dessert, path: "/category/desserts" },
];

function Categories() {
    const navigate = useNavigate();

  const handleCategoryClick = (path) => {
    navigate(path);
  };
  return (
    <section className={styles.categories}>
      <h2>Категорії</h2>
      <div className={styles.grid}>
        {categories.map((cat, index) => (
           <div
            key={index}
            className={styles.card}
            onClick={() => handleCategoryClick(cat.path)}
          >
            <img src={cat.img} alt={cat.title} />
            <button>{cat.title}</button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Categories

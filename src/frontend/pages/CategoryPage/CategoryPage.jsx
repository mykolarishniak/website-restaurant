import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import MenuItem from '../../components/MenuItem/MenuItem';
import { getItemsByCategory } from '../../services/menuService';

import styles from './CategoryPage.module.css';

function CategoryPage() {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      const data = await getItemsByCategory(categoryId);
      setItems(data);
      setLoading(false);
    }
    fetchItems();
  }, [categoryId]);

  const translateCategory = {
    drinks: 'Напої',
    salads: 'Салати',
    soups: 'Супи',
    main: 'Основні страви',
    sides: 'Гарніри',
    desserts: 'Десерти',
  };

  return (
    <>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>{translateCategory[categoryId] || 'Категорія'}</h1>

        {loading ? (
          <p>Завантаження...</p>
        ) : (
          <div className={styles.gridContainer}>
            {items.length > 0 ? (
              items.map(item => <MenuItem key={item.id} item={item} />)
            ) : (
              <p>Немає страв у цій категорії</p>
            )}
          </div>
        )}
      </main>
    </>
  );
}

export default CategoryPage;

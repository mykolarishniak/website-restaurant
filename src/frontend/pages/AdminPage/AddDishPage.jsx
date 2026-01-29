import React, { useState } from 'react';
import { addDish } from '../../services/menuService';
import styles from './AdminPage.module.css';

const AddDishPage = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const result = await addDish({ title, category, imgSrc, price: Number(price) });

    if (result.success) {
      alert(`Страву "${title}" успішно додано! ID: ${result.dish.id}`);
      setTitle('');
      setCategory('');
      setImgSrc('');
      setPrice('');
    } else {
      alert('Помилка додавання страви');
      console.error(result.error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Додавання нової страви</h2>

      <label>Назва:</label>
      <input value={title} onChange={e => setTitle(e.target.value)} required />

      <label>Категорія:</label>
      <select value={category} onChange={e => setCategory(e.target.value)} required>
        <option value="">Оберіть категорію</option>
        <option value="drinks">Напої</option>
        <option value="soups">Супи</option>
        <option value="salads">Салати</option>
        <option value="main">Основні страви</option>
        <option value="desserts">Десерти</option>
        <option value="sides">Гарніри</option>
      </select>

      <label>Зображення (URL):</label>
      <input value={imgSrc} onChange={e => setImgSrc(e.target.value)} required />

      <label>Ціна:</label>
      <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />

      <button type="submit" disabled={loading}>
        {loading ? 'Додавання...' : 'Додати'}
      </button>
    </form>
  );
};

export default AddDishPage;

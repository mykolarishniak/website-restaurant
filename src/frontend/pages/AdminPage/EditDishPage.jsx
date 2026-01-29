import React, { useState, useEffect } from 'react';
import { getMenuItems, updateDish } from '../../services/menuService';
import styles from './AdminPage.module.css';

const EditDishPage = () => {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      const data = await getMenuItems();
      setItems(data);
      setLoading(false);
    }
    fetchItems();
  }, []);

  const handleSelect = id => {
    setSelectedId(id);
    const dish = items.find(d => d.id === id);
    if (dish) {
      setTitle(dish.title);
      setPrice(dish.price);
    }
  };

  const handleEdit = async e => {
    e.preventDefault();
    setSaving(true);

    const result = await updateDish(selectedId, { title, price: Number(price) });

    if (result.success) {
      alert('Страву оновлено!');
      const updatedItems = await getMenuItems();
      setItems(updatedItems);
    } else {
      alert('Помилка редагування');
      console.error(result.error);
    }
    setSaving(false);
  };

  if (loading) {
    return <p>Завантаження...</p>;
  }

  return (
    <form onSubmit={handleEdit} className={styles.form}>
      <h2>Редагування страви</h2>

      <label>Оберіть страву:</label>
      <select value={selectedId} onChange={e => handleSelect(e.target.value)} required>
        <option value="">Оберіть...</option>
        {items.map(item => (
          <option key={item.id} value={item.id}>
            {item.title} — {item.price} грн
          </option>
        ))}
      </select>

      {selectedId && (
        <>
          <label>Нова назва:</label>
          <input value={title} onChange={e => setTitle(e.target.value)} />

          <label>Нова ціна:</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} />

          <button disabled={saving}>{saving ? 'Оновлення...' : 'Оновити'}</button>
        </>
      )}
    </form>
  );
};

export default EditDishPage;

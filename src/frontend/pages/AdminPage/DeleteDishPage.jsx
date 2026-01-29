import React, { useState, useEffect } from 'react';
import { getMenuItems, deleteDish } from '../../services/menuService';
import styles from './AdminPage.module.css';

const DeleteDishPage = () => {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      const data = await getMenuItems();
      setItems(data);
      setLoading(false);
    }
    fetchItems();
  }, []);

  const handleDelete = async e => {
    e.preventDefault();
    if (!selectedId) return;

    const dish = items.find(d => d.id === selectedId);
    if (!confirm(`Ви впевнені, що хочете видалити "${dish?.title}"?`)) {
      return;
    }

    setDeleting(true);
    const result = await deleteDish(selectedId);

    if (result.success) {
      alert(`Страву видалено`);
      setSelectedId('');
      const updatedItems = await getMenuItems();
      setItems(updatedItems);
    } else {
      alert('Помилка видалення');
      console.error(result.error);
    }
    setDeleting(false);
  };

  if (loading) {
    return <p>Завантаження...</p>;
  }

  return (
    <form onSubmit={handleDelete} className={styles.form}>
      <h2>Видалення страви</h2>

      <label>Оберіть страву:</label>
      <select value={selectedId} onChange={e => setSelectedId(e.target.value)} required>
        <option value="">Оберіть...</option>
        {items.map(item => (
          <option key={item.id} value={item.id}>
            {item.title} — {item.price} грн
          </option>
        ))}
      </select>

      <button className={styles.deleteBtn} disabled={deleting || !selectedId}>
        {deleting ? 'Видалення...' : 'Видалити'}
      </button>
    </form>
  );
};

export default DeleteDishPage;

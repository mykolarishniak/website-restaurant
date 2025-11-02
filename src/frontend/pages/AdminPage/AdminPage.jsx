import React from 'react';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import styles from './AdminPage.module.css';

const AddDishForm = () => (
  <div className={styles.formContainer}>
    <h2 className={styles.formTitle}>Додавання нової страви</h2>
    <form className={styles.form}>

      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>Введіть назву страви:</label>
        <input type="text" id="name" className={styles.input} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="category" className={styles.label}>Оберіть категорію страви:</label>
        <input type="text" id="category" className={styles.input} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="image" className={styles.label}>Виберіть зображення для страви:</label>
        <input type="file" id="image" className={styles.input} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="price" className={styles.label}>Введіть ціну страви:</label>
        <input type="number" id="price" className={styles.input} />
      </div>

      <button type="submit" className={styles.submitButton}>
        Додати страву
      </button>
    </form>
  </div>
);


function AdminPage() {
  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <main className={styles.content}>
        <AddDishForm />
      </main>
    </div>
  );
}

export default AdminPage;

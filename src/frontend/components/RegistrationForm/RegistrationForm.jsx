import React from 'react';
import styles from './RegistrationForm.module.css';
import { Link } from 'react-router-dom';

function RegistrationForm() {

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form submitted!');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Створити новий обліковий запис</h2>

      <form className={styles.form} onSubmit={handleSubmit}>

        <div className={styles.field}>
          <label htmlFor="username" className={styles.label}>Ім'я користувача</label>
          <input
            type="text"
            id="username"
            className={styles.input}
            placeholder="Введіть ваше ім'я"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            className={styles.input}
            placeholder="example@mail.com"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>Пароль</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            placeholder="Мінімум 8 символів"
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Зареєструватися
        </button>

        <p className={styles.loginLink}>
          Вже маєте обліковий запис? <Link to="/login">Увійти</Link>
        </p>
      </form>
    </div>
  );
}

export default RegistrationForm;

import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { Link } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Вхід виконано:', formData);
    alert('Успішний вхід!');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Увійти в акаунт</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Введіть email"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Пароль</label>
          <input
            className={styles.input}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Введіть пароль"
            required
          />
        </div>

        <button className={styles.submitButton} type="submit">
          Увійти
        </button>

        <p className={styles.registerLink}>
          Не маєте акаунта? <Link to="/register">Зареєструватися</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;

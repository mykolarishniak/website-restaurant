import React, { useState, useContext } from 'react';
import styles from './RegistrationForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { validateRegistrationData, registerUser } from "../../services/authService";
import { UserContext } from '../../context/UserContext';

function RegistrationForm() {
  const { login } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const validationErrors = validateRegistrationData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccess("");

    try {
      const response = await registerUser(formData);
      setSuccess(response.message);

      login(response.user);

      e.target.reset();
      navigate("/");
    } catch (err) {
      setErrors({ global: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Створити новий обліковий запис</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="username" className={styles.label}>Ім'я користувача</label>
          <input type="text" id="username" className={styles.input} placeholder="Введіть ваше ім'я" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input type="email" id="email" className={styles.input} placeholder="example@mail.com" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>Пароль</label>
          <input type="password" id="password" className={styles.input} placeholder="Мінімум 8 символів" required />
        </div>

        <button type="submit" className={styles.submitButton}>Зареєструватися</button>

        <p className={styles.loginLink}>
          Вже маєте обліковий запис? <Link to="/login">Увійти</Link>
        </p>
      </form>
    </div>
  );
}

export default RegistrationForm;

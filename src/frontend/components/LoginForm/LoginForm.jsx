// import React, { useState } from 'react';
// import styles from './LoginForm.module.css';
// import { Link } from 'react-router-dom';
// import { authService } from '../../services/authService';

// function LoginForm() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     try {
//       authService.login(formData.email, formData.password);
//       alert("Успішний вхід!");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Увійти в акаунт</h2>

//       <form className={styles.form} onSubmit={handleSubmit}>
//         <div className={styles.field}>
//           <label className={styles.label}>Email</label>
//           <input
//             className={styles.input}
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Введіть email"
//             required
//           />
//         </div>

//         <div className={styles.field}>
//           <label className={styles.label}>Пароль</label>
//           <input
//             className={styles.input}
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Введіть пароль"
//             required
//           />
//         </div>

//         <button className={styles.submitButton} type="submit">
//           Увійти
//         </button>

//         <p className={styles.registerLink}>
//           Не маєте акаунта? <Link to="/register">Зареєструватися</Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default LoginForm;

import React, { useState, useContext } from 'react';
import styles from './LoginForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { UserContext } from '../../context/UserContext';

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.login(formData);
      login(response.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

        <button className={styles.submitButton} type="submit" disabled={loading}>
          {loading ? "Завантаження..." : "Увійти"}
        </button>

        <p className={styles.registerLink}>
          Не маєте акаунта? <Link to="/register">Зареєструватися</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;

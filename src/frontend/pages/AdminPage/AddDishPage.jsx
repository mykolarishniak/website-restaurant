import React, { useState } from "react";
import styles from "./AdminPage.module.css";

const AddDishPage = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Страву "${name}" успішно додано!`);
    setName("");
    setCategory("");
    setImage("");
    setPrice("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.inner}>
          <h2>Додавання нової страви</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>Назва страви:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Категорія:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />

            <label>Зображення (URL або назва файлу):</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />

            <label>Ціна:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <button type="submit">Додати страву</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDishPage;

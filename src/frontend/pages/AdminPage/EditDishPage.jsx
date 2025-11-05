import React, { useState } from "react";
import styles from "./AdminPage.module.css";

const EditDishPage = () => {
  const [dishId, setDishId] = useState("");
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const handleEdit = (e) => {
    e.preventDefault();
    alert(`Страву з ID ${dishId} успішно оновлено!`);
    setDishId("");
    setNewName("");
    setNewPrice("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.inner}>
          <h2>Редагування страви</h2>
          <form onSubmit={handleEdit} className={styles.form}>
            <label>ID страви:</label>
            <input
              type="text"
              value={dishId}
              onChange={(e) => setDishId(e.target.value)}
              required
            />

            <label>Нова назва:</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />

            <label>Нова ціна:</label>
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />

            <button type="submit">Оновити страву</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDishPage;

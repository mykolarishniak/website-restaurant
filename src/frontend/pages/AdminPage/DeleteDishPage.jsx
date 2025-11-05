import React, { useState } from "react";
import styles from "./AdminPage.module.css";

const DeleteDishPage = () => {
  const [dishId, setDishId] = useState("");

  const handleDelete = (e) => {
    e.preventDefault();
    alert(`Страву з ID ${dishId} видалено!`);
    setDishId("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.inner}>
          <h2>Видалення страви</h2>
          <form onSubmit={handleDelete} className={styles.form}>
            <label>Введіть ID страви:</label>
            <input
              type="text"
              value={dishId}
              onChange={(e) => setDishId(e.target.value)}
              required
            />
            <button type="submit" className={styles.deleteBtn}>
              Видалити страву
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteDishPage;

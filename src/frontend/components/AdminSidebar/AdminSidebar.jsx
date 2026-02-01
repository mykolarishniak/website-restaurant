import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./AdminSidebar.module.css";

const AdminSidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.topSection}>
        <h2 className={styles.title}>Адмін-панель</h2>
        <nav className={styles.nav}>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `${styles.button} ${isActive ? styles.active : ""}`
            }
          >
            Додати страву
          </NavLink>
          <NavLink
            to="/admin/edit"
            className={({ isActive }) =>
              `${styles.button} ${isActive ? styles.active : ""}`
            }
          >
            Змінити страву
          </NavLink>
          <NavLink
            to="/admin/delete"
            className={({ isActive }) =>
              `${styles.button} ${isActive ? styles.active : ""}`
            }
          >
            Видалити страву
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `${styles.button} ${isActive ? styles.active : ""}`
            }
          >
            Замовлення
          </NavLink>
        </nav>
      </div>

      <div className={styles.footer}>
        <a href="/" className={styles.footerButton}>
          На головну
        </a>
      </div>
    </aside>
  );
};

export default AdminSidebar;

import React from 'react';
import styles from './AdminSidebar.module.css';

const adminActions = [
  { label: 'Додати страву', key: 'add' },
  { label: 'Видалити страву', key: 'delete' },
  { label: 'Змінити страву', key: 'edit' },
];

function AdminSidebar() {
  return (
    <div className={styles.sidebar}>
      <h3 className={styles.title}>Адмін-панель</h3>
      <nav className={styles.nav}>
        {adminActions.map((action) => (
          <button
            key={action.key}
            className={styles.button}
          >
            {action.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default AdminSidebar;

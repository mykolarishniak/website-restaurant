// // import React from "react";
// // import styles from "./AdminSidebar.module.css";

// // const adminActions = [
// //   { label: "Додати страву", key: "add" },
// //   { label: "Видалити страву", key: "delete" },
// //   { label: "Змінити страву", key: "edit" },
// // ];

// // function AdminSidebar({ setActivePage, activePage }) {
// //   return (
// //     <div className={styles.sidebar}>
// //       <h3 className={styles.title}>Адмін-панель</h3>
// //       <nav className={styles.nav}>
// //         {adminActions.map((action) => (
// //           <button
// //             key={action.key}
// //             className={`${styles.button} ${
// //               activePage === action.key ? styles.active : ""
// //             }`}
// //             onClick={() => setActivePage(action.key)}
// //           >
// //             {action.label}
// //           </button>
// //         ))}
// //       </nav>
// //     </div>
// //   );
// // }

// // export default AdminSidebar;

// import React from "react";
// import { NavLink } from "react-router-dom";
// import styles from "./AdminSidebar.module.css";

// const AdminSidebar = () => {
//   return (
//     <aside className={styles.sidebar}>
//       <h3 className={styles.title}>Адмін-панель</h3>
//       <nav className={styles.nav}>
//         <NavLink
//           to="/admin"
//           end
//           className={({ isActive }) =>
//             `${styles.button} ${isActive ? styles.active : ""}`
//           }
//         >
//           Додати страву
//         </NavLink>

//         <NavLink
//           to="/admin/edit"
//           className={({ isActive }) =>
//             `${styles.button} ${isActive ? styles.active : ""}`
//           }
//         >
//           Змінити страву
//         </NavLink>

//         <NavLink
//           to="/admin/delete"
//           className={({ isActive }) =>
//             `${styles.button} ${isActive ? styles.active : ""}`
//           }
//         >
//           Видалити страву
//         </NavLink>
//       </nav>
//     </aside>
//   );
// };

// export default AdminSidebar;

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

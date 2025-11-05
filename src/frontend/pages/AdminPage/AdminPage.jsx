// import React, { useState } from "react";
// import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
// import AddDishPage from "./AddDishPage";
// import EditDishPage from "./EditDishPage";
// import DeleteDishPage from "./DeleteDishPage";
// import styles from "./AdminPage.module.css";

// function AdminPage() {
//   const [activePage, setActivePage] = useState("add");

//   const renderContent = () => {
//     switch (activePage) {
//       case "add":
//         return <AddDishPage />;
//       case "edit":
//         return <EditDishPage />;
//       case "delete":
//         return <DeleteDishPage />;
//       default:
//         return <AddDishPage />;
//     }
//   };

//   return (
//     <div className={styles.adminLayout}>
//       <AdminSidebar setActivePage={setActivePage} activePage={activePage} />
//       <main className={styles.content}>{renderContent()}</main>
//     </div>
//   );
// }

// export default AdminPage;

import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import AddDishPage from "./AddDishPage";
import EditDishPage from "./EditDishPage";
import DeleteDishPage from "./DeleteDishPage";
import styles from "./AdminPage.module.css";

const AdminPage = () => {
  return (
    <div className={styles.wrapper}>
      {/* Ліва частина — бічна панель (завжди видима) */}
      <AdminSidebar />

      {/* Права частина — змінний контент */}
      <main className={styles.content}>
        <div className={styles.inner}>
          <Routes>
            <Route path="/" element={<AddDishPage />} />
            <Route path="/edit" element={<EditDishPage />} />
            <Route path="/delete" element={<DeleteDishPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;

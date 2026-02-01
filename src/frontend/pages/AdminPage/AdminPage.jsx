import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import AddDishPage from "./AddDishPage";
import EditDishPage from "./EditDishPage";
import DeleteDishPage from "./DeleteDishPage";
import AdminOrdersPage from "./AdminOrdersPage";
import styles from "./AdminPage.module.css";

const AdminPage = () => {
  return (
    <div className={styles.wrapper}>
      <AdminSidebar />
      <main className={styles.content}>
        <div className={styles.inner}>
          <Routes>
            <Route path="/" element={<AddDishPage />} />
            <Route path="/edit" element={<EditDishPage />} />
            <Route path="/delete" element={<DeleteDishPage />} />
            <Route path="/orders" element={<AdminOrdersPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;

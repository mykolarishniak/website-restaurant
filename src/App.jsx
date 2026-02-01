import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './frontend/context/UserContext';
import { Navigate } from 'react-router-dom';
import Home from './frontend/pages/Home/Home';
import RegistrationPage from './frontend/pages/RegistrationPage/RegistrationPage';
import AdminPage from './frontend/pages/AdminPage/AdminPage';
import LoginPage from './frontend/pages/LoginPage/LoginPage';
import { saveMenuItems, getMenuItems } from './frontend/services/menuService';
import classicmojito from './assets/images/classismojito.png';
import mulledWine from './assets/images/mulledwine.png';
import lemonade from './assets/images/lemonade.png';
import longIsland from './assets/images/longisland.png';
import mojito from './assets/images/mojito.png';
import ginTonic from './assets/images/gintonic.png';
import borsch from './assets/images/borsch.png';
import CategoryPage from './frontend/pages/CategoryPage/CategoryPage';
import CartPage from './frontend/pages/CartPage/CartPage.jsx';
import { CartProvider } from './frontend/context/CartContext.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './frontend/context/UserContext.jsx';
import CheckoutPage from './frontend/pages/CheckoutPage/CheckoutPage.jsx';
import { AuthProvider } from './frontend/context/AuthContext.jsx';
import OrdersPage from './frontend/pages/OrdersPage/OrdersPage.jsx';
import { requireAdmin } from "./frontend/services/adminService";

const initialData = [
  { title: 'Мохіто класичний', price: 85, imgSrc: classicmojito, category: 'drinks' },
  { title: 'Глінтвейн', price: 90, imgSrc: mulledWine, category: 'drinks' },
  { title: 'Лимонад', price: 70, imgSrc: lemonade, category: 'drinks' },
  { title: 'Long Island', price: 90, imgSrc: longIsland, category: 'drinks' },
  { title: 'Мохіто', price: 80, imgSrc: mojito, category: 'drinks' },
  { title: 'Джин-тонік', price: 90, imgSrc: ginTonic, category: 'drinks' },
  { title: 'Борщ', price: 180, imgSrc: borsch, category: 'soups' },
];

function AdminRoute({ children }) {
  const { user } = useContext(UserContext);

  console.log('AdminRoute check, current user:', user);

  if (user === undefined) return <p>Завантаження...</p>;

  if (!user) {
    alert('Доступ заборонено. Ви повинні бути авторизовані.');
    return <Navigate to="/" replace />;
  }

  if (user.role !== 'admin') {
    alert('Доступ заборонено. Ви повинні бути адміністратором.');
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  useEffect(() => {
    async function initMenu() {
      const items = await getMenuItems();
      if (items.length === 0) {
        await saveMenuItems(initialData);
      }
    }
    initMenu();
  }, []);

  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route
                path="/admin/*"
                element={
                  <AdminRoute>
                    <AdminPage />
                  </AdminRoute>
                }
              />
            </Routes>
          </Router>
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;

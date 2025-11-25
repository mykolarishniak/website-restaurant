import React, { useEffect } from 'react'
import Home from './frontend/pages/Home/Home'
import DrinksPage from './frontend/pages/DrinksPage/DrinksPage';
import RegistrationPage from './frontend/pages/RegistrationPage/RegistrationPage';
import AdminPage from './frontend/pages/AdminPage/AdminPage';
import LoginPage from './frontend/pages/LoginPage/LoginPage';
import { saveMenuItems, getMenuItems } from "./frontend/services/menuService";
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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from './frontend/context/UserContext.jsx';
import CheckoutPage from './frontend/pages/CheckoutPage/CheckoutPage.jsx';
import { AuthProvider } from './frontend/context/AuthContext.jsx';
import OrdersPage from './frontend/pages/OrdersPage/OrdersPage.jsx';


const initialData = [
  { id: '1', title: 'Мохіто класичний', price: '85 грн.', imgSrc: classicmojito, category: 'drinks' },
  { id: '2',title: 'Глінтвейн', price: '90 грн.', imgSrc: mulledWine, category: 'drinks' },
  { id: '3', title: 'Лимонад', price: '70 грн.', imgSrc: lemonade, category: 'drinks' },
  { id: '4', title: 'Long Island', price: '90 грн.', imgSrc: longIsland, category: 'drinks' },
  { id: '5', title: 'Мохіто', price: '80 грн.', imgSrc: mojito, category: 'drinks' },
  { id: '6', title: 'Джин-тонік', price: '90 грн.', imgSrc: ginTonic, category: 'drinks' },
  { id: '7', title: 'Борщ', price: '180 грн.', imgSrc: borsch, category: 'soups' },
];

function App() {
    useEffect(() => {
  if (getMenuItems().length === 0) {
    saveMenuItems(initialData);
  }
}, []);

  return (
    <>
    <CartProvider>
    <AuthProvider>
      <UserProvider>
        <CartProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/drinks" element={<DrinksPage />} /> */}
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </Router>
    </CartProvider>
    </UserProvider>
    </AuthProvider>
    </CartProvider>
    </>
  )
}

export default App;

import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from './Header.module.css';
import { getCurrentUser, logoutUser } from '../../services/authService';
import { CartContext } from "../../context/CartContext";


function Header() {
  const { user, setUser } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
  logoutUser();
  setUser(null);
  navigate("/login");
};

const cartCount = cart.reduce(
  (sum, item) => sum + item.quantity,
  0
);


  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        UzhRestaurant
      </Link>

      <nav className={styles.nav}>
        <a href="#">Про нас</a>
        <a href="#">Ціни</a>
        <a href="#">Контакти</a>
      </nav>

     <div className={styles.actions}>

  <Link to="/cart" className={styles.cartIcon}>
    <span className={styles.cartEmoji}>🛒</span>
    {cartCount > 0 && (
    <span className={styles.cartBadge}>
      {cartCount}
    </span>
  )}
  </Link>

  {!user ? (
    <>
      <Link to="/login" className={styles.login}>Увійти</Link>
      <Link to="/register" className={styles.signup}>Зареєструватися</Link>
    </>
  ) : (
    <div className={styles.userMenu} ref={dropdownRef}>
      <div
        className={styles.avatar}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {user.username[0].toUpperCase()}
      </div>

      {dropdownOpen && (
        <div className={styles.dropdown}>
          <p><strong>{user.username}</strong></p>
          <p>{user.email}</p>
          <Link
      to="/orders"
      className={styles.ordersBtn}
      onClick={() => setDropdownOpen(false)}
    >
      📦 Мої замовлення
    </Link>
          <button onClick={handleLogout}>Вийти</button>
        </div>
      )}
    </div>
  )}
</div>

    </header>
  );
}

export default Header;

import { useContext, useEffect, useRef } from "react";
import { CartContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./CartPage.module.css";
import Header from "../../components/Header/Header";

const parsePrice = (price) => {
    if (price == null) return 0;
    if (typeof price === 'number') return price;
    const parsed = parseFloat(String(price).replace(/[^\d,.]/g, '').replace(',', '.'));
    return isNaN(parsed) ? 0 : parsed;
};

export default function CartPage() {
    const { cart, increase, decrease, removeFromCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const alertedRef = useRef(false);

    useEffect(() => {
    if (!user && !alertedRef.current) {
      alertedRef.current = true;
      alert("Увійдіть в акаунт, щоб переглянути кошик!");
      navigate('/login');
    }
  }, [user]);

  if (!user) return null;

    const totalCartPrice = cart.reduce((sum, item) => {
        const unitPrice = parsePrice(item.price);
        return sum + (unitPrice * item.quantity);
    }, 0);

    return (
        <>
        <Header/>
        <div className={styles.container}>
            <h1 className={styles.title}>Кошик</h1>

            {cart.length === 0 && (
                <p>Ваш кошик порожній.</p>
            )}

            {cart.map(item => {
                if (!item.id) {
                    console.error("Cart item is missing a unique ID. Skipping...", item);
                    return null;
                }

                const unitPrice = parsePrice(item.price);
                const itemTotalPrice = (unitPrice * item.quantity).toFixed(2);
                const itemName = item.title || item.name || 'Товар';

                return (
                    <div className={styles.item} key={item.id}>
                        <img
                            src={item.imgSrc || item.img}
                            alt={itemName}
                            className={styles.img}
                        />

                        <div className={styles.info}>
                            <h3 className={styles.itemName}>{itemName}</h3>
                            <p className={styles.unitPrice}>
                                Ціна за одиницю: <strong>{unitPrice.toFixed(2)} грн.</strong>
                            </p>
                        </div>

                        <div className={styles.quantity}>
                            <button onClick={() => decrease(item.id)}>-</button>
                            <span className={styles.itemQuantity}>{item.quantity}</span>
                            <button onClick={() => increase(item.id)}>+</button>
                        </div>

                        <div className={styles.priceSummary}>
                            <p className={styles.itemTotal}>
                                Всього: <strong>{itemTotalPrice} грн.</strong>
                            </p>
                        </div>

                        <button
                            className={styles.delete}
                            onClick={() => removeFromCart(item.id)}
                        >
                            ×
                        </button>
                    </div>
                );
            })}

            {cart.length > 0 && (
                <div className={styles.checkoutSection}>
                    <p className={styles.totalSum}>
                        Загальна сума замовлення: <strong>{totalCartPrice.toFixed(2)} грн.</strong>
                    </p>
                    <Link to="/checkout" className={styles.checkoutBtn}>
                        Оформити замовлення
                    </Link>
                </div>
            )}
        </div>
        </>
    );
}

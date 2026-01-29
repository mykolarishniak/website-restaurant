import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { createOrder } from '../../services/orderService';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styles from './CheckoutPage.module.css';

export default function CheckoutPage() {
  const { cart, clearCart } = useContext(CartContext);
  const { user, loading } = useContext(AuthContext);

  const [phone, setPhone] = useState('');
  const [delivery, setDelivery] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      alert('Увійдіть в акаунт, щоб оформити замовлення');
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleSubmit = async () => {
    setSubmitting(true);
    const result = await createOrder({
      phone,
      delivery,
      cart,
    });

    if (result.success) {
      clearCart();
      navigate('/');
    }
    setSubmitting(false);
  };

  return (
    <>
      <Header />

      <div className={styles.container}>
        <h1 className={styles.title}>Оформлення замовлення</h1>

        {cart.length === 0 ? (
          <p>Кошик порожній. Додайте товари для оформлення.</p>
        ) : (
          <>
            {cart.map(item => (
              <div className={styles.item} key={item.id}>
                <img src={item.imgSrc} alt={item.title} />
                <div className={styles.info}>
                  <h3>{item.title}</h3>
                  <p>{item.price} грн</p>
                  <span>Кількість: {item.quantity}</span>
                </div>
              </div>
            ))}

            <label>Введіть номер телефону:</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} />

            <label>Оберіть спосіб отримання:</label>
            <select value={delivery} onChange={e => setDelivery(e.target.value)}>
              <option value="">Оберіть...</option>
              <option value="self">Самовивіз</option>
              <option value="courier">Кур'єр</option>
            </select>

            <button className={styles.submit} onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Оформлення...' : 'Оформити замовлення'}
            </button>

            <button className={styles.cancel} onClick={() => navigate('/cart')}>
              Скасувати
            </button>
          </>
        )}
      </div>
    </>
  );
}

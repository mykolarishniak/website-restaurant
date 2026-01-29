import React, { useEffect, useState, useContext } from 'react';
import { getOrdersByUser } from '../../services/orderService';
import { AuthContext } from '../../context/AuthContext';
import styles from './OrdersPage.module.css';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchOrders() {
      if (user) {
        setLoading(true);
        const userOrders = await getOrdersByUser(user.id);
        setOrders(userOrders);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [user]);

  if (!user) {
    return <p className={styles.message}>Увійдіть в акаунт, щоб переглянути свої замовлення.</p>;
  }

  if (loading) {
    return <p className={styles.message}>Завантаження...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ваші замовлення</h1>

      {orders.length === 0 ? (
        <p className={styles.message}>Замовлень поки немає.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className={styles.orderBlock}>
            <div className={styles.orderHeader}>
              <span>Замовлення №{order.id.slice(0, 8)}</span>
              <span>{order.date ? new Date(order.date).toLocaleDateString('uk-UA') : ''}</span>
            </div>

            <div className={styles.itemsList}>
              {order.items.map((item, idx) => (
                <div key={idx} className={styles.item}>
                  <img src={item.imgSrc} alt={item.title} />
                  <div className={styles.info}>
                    <h3>{item.title}</h3>
                    <p>Ціна: {item.price}</p>
                    <p>Кількість: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.total}>
              Сума замовлення: <b>{order.total} грн</b>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

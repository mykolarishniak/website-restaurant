import React, { useEffect, useState, useContext } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { UserContext } from "../../context/UserContext";
import styles from "./OrdersPage.module.css";
import Header from "../../../frontend/components/Header/Header";

const STATUS_LABELS = {
  pending: "Прийнято в обробку",
  cooking: "Готується",
  ready: "Готово",
  completed: "Виконано",
  delivering: "Доставляється",
  delivered: "Доставлено",
};

/* Тип доставки */
const DELIVERY_LABELS = {
  self: "Самовивіз",
  courier: "Доставка курʼєром",
};

const OrdersPage = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadOrders = async () => {
      setLoading(true);

      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.id),
        orderBy("createdAt", "desc") // нові зверху
      );

      const snap = await getDocs(q);

      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(data);
      setLoading(false);
    };

    loadOrders();
  }, [user]);

  if (!user) {
    return (
      <p className={styles.message}>
        Увійдіть в акаунт, щоб переглянути свої замовлення
      </p>
    );
  }

  if (loading) {
    return <p className={styles.message}>Завантаження...</p>;
  }

  return (
    <>
    <Header />
    <div className={styles.container}>
      <h1 className={styles.title}>Мої замовлення</h1>

      {orders.length === 0 ? (
        <p className={styles.message}>У вас ще немає замовлень</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className={styles.orderBlock}>
            {/* Шапка */}
            <div className={styles.orderHeader}>
              <span>
                Замовлення №{order.id.slice(0, 8)}
              </span>

              <span>
                {order.createdAt?.toDate
                  ? order.createdAt
                      .toDate()
                      .toLocaleString("uk-UA")
                  : ""}
              </span>
            </div>

            {/* Доставка + статус */}
            <div className={styles.meta}>
              <span>
                {DELIVERY_LABELS[order.delivery] || "Самовивіз"}
              </span>

              <span className={styles.status}>
                {STATUS_LABELS[order.status] ||
                  "Прийнято в обробку"}
              </span>
            </div>

            {/* Товари */}
            <div className={styles.itemsList}>
              {order.items?.map((item, index) => (
                <div key={index} className={styles.item}>
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                  />

                  <div className={styles.info}>
                    <h3>{item.title}</h3>
                    <p>Ціна: {item.price} грн</p>
                    <p>Кількість: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Сума */}
            <div className={styles.total}>
              Сума замовлення:{" "}
              <b>{order.total} грн</b>
            </div>
          </div>
        ))
      )}
    </div>
    </>
  );
};

export default OrdersPage;

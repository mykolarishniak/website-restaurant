import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "./AdminOrdersPage.module.css";

/* Статуси українською */
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

/* Логічні ланцюжки статусів */
const STATUS_FLOW = {
  self: ["pending", "cooking", "ready", "completed"],
  courier: ["pending", "cooking", "delivering", "delivered"],
};

const getAllowedStatuses = (delivery, currentStatus) => {
  const flow = STATUS_FLOW[delivery || "self"];
  if (!flow) return ["pending"];

  if (!currentStatus || !flow.includes(currentStatus)) {
    return [flow[0]];
  }

  const index = flow.indexOf(currentStatus);
  return flow.slice(index, index + 2);
};

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [usersMap, setUsersMap] = useState({});

  useEffect(() => {
    const q = query(
    collection(db, "orders"),
    orderBy("createdAt", "asc")
  );

  const unsub = onSnapshot(q, async (snap) => {
    const ordersData = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    setOrders(ordersData);

    const userIds = [
      ...new Set(ordersData.map(o => o.userId).filter(Boolean)),
    ];

    const users = {};

    for (const uid of userIds) {
      const userSnap = await getDoc(doc(db, "users", uid));
      if (userSnap.exists()) {
        users[uid] = userSnap.data();
      }
    }

    setUsersMap(users);
  });

  return () => unsub();
  }, []);

  const changeStatus = async (orderId, newStatus) => {
    await updateDoc(doc(db, "orders", orderId), {
      status: newStatus,
    });
  };

  return (
    <div className={styles.wrapper}>
      <h2>Замовлення</h2>

      {orders.map((order) => (
        <div key={order.id} className={styles.card}>
          {/* Заголовок */}
          <div className={styles.header}>
            <div>
              <strong>Клієнт:</strong>{" "}
              {usersMap[order.userId]?.username ||
                "Користувач не знайдений"}
            </div>

            <span className={styles.delivery}>
              {DELIVERY_LABELS[order.delivery] || "Самовивіз"}
            </span>
          </div>

          {/* Товари */}
          <div className={styles.items}>
            {order.items?.map((item, i) => (
              <div key={i} className={styles.itemRow}>
                {item.title} × {item.quantity}
              </div>
            ))}
          </div>

          {/* Сума */}
          <p className={styles.total}>
            <strong>Сума:</strong> {order.total} грн
          </p>

          {/* Статус */}
          <label className={styles.status}>
            Статус:
            <select
              value={order.status || "pending"}
              onChange={(e) =>
                changeStatus(order.id, e.target.value)
              }
            >
              {getAllowedStatuses(
                order.delivery,
                order.status
              ).map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </label>
        </div>
      ))}
    </div>
  );
};

export default AdminOrdersPage;

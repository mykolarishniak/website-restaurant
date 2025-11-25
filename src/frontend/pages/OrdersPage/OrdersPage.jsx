// import React, { useEffect, useState } from 'react';
// import { authService } from '../../services/authService';
// import { getOrdersByUser } from '../../services/orderService';
// import { useNavigate } from 'react-router-dom';

// export default function OrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const currentUser = authService.getCurrentUser();

//     if (!currentUser) {
//       alert("Авторизуйтесь, щоб переглядати свої замовлення");
//       navigate("/login");
//       return;
//     }

//     setUser(currentUser);

//     const userOrders = getOrdersByUser(currentUser.id);
//     setOrders(userOrders);
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Мої замовлення</h2>

//       {orders.length === 0 ? (
//         <p>У вас ще немає замовлень.</p>
//       ) : (
//         <ul>
//           {orders.map(order => (
//             <li key={order.id} style={{ marginBottom: "15px", padding: "10px", border: "1px solid #ccc" }}>
//               <p><strong>Номер замовлення:</strong> {order.id}</p>
//               <p><strong>Дата:</strong> {order.date}</p>
//               <p><strong>Сума:</strong> {order.total} грн</p>

//               <p><strong>Страви:</strong></p>
//               <ul>
//                 {order.items.map(item => (
//                   <li key={item.id}>
//                     {item.title} — {item.price} × {item.quantity}
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       )}

//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { authService } from "../../services/authService";
import { getOrdersByUser } from "../../services/orderService";
import styles from "./OrdersPage.module.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    if (currentUser) {
      const userOrders = getOrdersByUser(currentUser.id);
      setOrders(userOrders);
    }
  }, []);

  if (!currentUser) {
    return <p className={styles.message}>Увійдіть в акаунт, щоб переглянути свої замовлення.</p>;
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
              <span>Замовлення №{order.id}</span>
              <span>{order.date}</span>
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

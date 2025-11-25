import { authService } from './authService';

export function checkAuthForOrder() {
  const currentUser = authService.getCurrentUser();
  if (!currentUser) {
    alert("Щоб зробити замовлення, потрібно увійти в акаунт.");
    return null;
  }
  return currentUser;
}

export function validateOrder({ phone, delivery, cart }) {
  const errors = [];

  if (!phone.trim() || phone.length < 10) {
    errors.push("Некоректний номер телефону");
  }

  if (!delivery) {
    errors.push("Оберіть спосіб доставки");
  }

  if (!cart || cart.length === 0) {
    errors.push("Кошик порожній");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return false;
  }

  return true;
}

export function saveOrder(order) {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
}

export function createOrder({ phone, delivery, cart }) {
  const user = checkAuthForOrder();
  if (!user) return { success: false };

  const isValid = validateOrder({ phone, delivery, cart });
  if (!isValid) return { success: false };

  const order = {
    id: Date.now(),
    userId: user.id,
    items: cart,
    phone,
    delivery,
    createdAt: new Date().toISOString(),
  };

  saveOrder(order);

  alert("Замовлення успішно оформлено!");

  return { success: true, order };
}

export function getOrdersByUser(userId) {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  return orders.filter(order => order.userId === userId);
}

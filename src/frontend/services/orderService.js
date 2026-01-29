import { auth, db } from '../../firebase';
import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from 'firebase/firestore';

const ORDERS_COLLECTION = 'orders';

export function checkAuthForOrder() {
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) {
    alert('Щоб зробити замовлення, потрібно увійти в акаунт.');
    return null;
  }
  return {
    id: firebaseUser.uid,
    username: firebaseUser.displayName,
    email: firebaseUser.email,
  };
}

export function validateOrder({ phone, delivery, cart }) {
  const errors = [];

  if (!phone.trim() || phone.length < 10) {
    errors.push('Некоректний номер телефону');
  }

  if (!delivery) {
    errors.push('Оберіть спосіб доставки');
  }

  if (!cart || cart.length === 0) {
    errors.push('Кошик порожній');
  }

  if (errors.length > 0) {
    alert(errors.join('\n'));
    return false;
  }

  return true;
}

export async function saveOrder(order) {
  try {
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
      ...order,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving order:', error);
    return { success: false, error };
  }
}

export async function createOrder({ phone, delivery, cart }) {
  const user = checkAuthForOrder();
  if (!user) return { success: false };

  const isValid = validateOrder({ phone, delivery, cart });
  if (!isValid) return { success: false };

  const total = cart.reduce((sum, item) => {
    const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^\d.]/g, '')) : item.price;
    return sum + price * item.quantity;
  }, 0);

  const order = {
    userId: user.id,
    items: cart.map(item => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      imgSrc: item.imgSrc,
    })),
    phone,
    delivery,
    status: 'pending',
    total,
  };

  const result = await saveOrder(order);

  if (result.success) {
    alert('Замовлення успішно оформлено!');
    return {
      success: true,
      order: { ...order, id: result.id },
    };
  }

  return { success: false };
}

export async function getOrdersByUser(userId) {
  try {
    const q = query(collection(db, ORDERS_COLLECTION), where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data(),
      date: docSnap.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
}

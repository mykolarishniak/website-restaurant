import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import {
  getMenuItems as fetchMenuItems,
  addDish as createDish,
  updateDish as editDish,
  deleteDish as removeDish,
} from './menuService';

import { onAuthStateChanged } from "firebase/auth";

// export async function checkAdminAccess() {
//   const firebaseUser = auth.currentUser;
//   if (!firebaseUser) {
//     alert('Доступ заборонено. Ви повинні бути авторизовані.');
//     return false;
//   }

//   try {
//     const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
//     const userData = userDoc.data();

//     if (!userData || userData.role !== 'admin') {
//       alert('Доступ заборонено. Ви повинні бути адміністратором.');
//       return false;
//     }
//     return true;
//   } catch (error) {
//     console.error('Error checking admin access:', error);
//     return false;
//   }
// }

export function requireAdmin() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        resolve({ allowed: false, reason: 'not-logged-in' });
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data();

        if (!userData || userData.role !== 'admin') {
          resolve({ allowed: false, reason: 'not-admin' });
          return;
        }

        resolve({ allowed: true, user: { ...userData, id: firebaseUser.uid } });
      } catch (error) {
        console.error('Error checking admin access:', error);
        resolve({ allowed: false, reason: 'error' });
      }
    });
  });
}

export function checkAdminAccess() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        alert("Доступ заборонено. Ви повинні бути авторизовані.");
        return resolve(false);
      }

      try {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        const userData = userDoc.data();

        if (!userData || userData.role !== "admin") {
          alert("Доступ заборонено. Ви повинні бути адміністратором.");
          return resolve(false);
        }

        resolve(true);
      } catch (error) {
        console.error("Error checking admin access:", error);
        resolve(false);
      }
    });
  });
}

export async function addDish({ title, category, imgSrc, price }) {
  const isAdmin = await checkAdminAccess();
  if (!isAdmin) return null;

  const result = await createDish({ title, category, imgSrc, price });
  if (result.success) {
    alert(`Страва "${title}" успішно додана!`);
  }
  return result.dish || null;
}

export async function updateDish(id, updates) {
  const isAdmin = await checkAdminAccess();
  if (!isAdmin) return null;

  const result = await editDish(id, updates);
  if (result.success) {
    alert(`Страву з ID ${id} успішно оновлено!`);
  } else {
    alert('Страву не знайдено.');
  }
  return result.dish || null;
}

export async function deleteDish(id) {
  const isAdmin = await checkAdminAccess();
  if (!isAdmin) return false;

  const result = await removeDish(id);
  if (result.success) {
    alert(`Страву з ID ${id} видалено.`);
  } else {
    alert('Страву не знайдено.');
  }
  return result.success;
}

export async function getAllDishes() {
  return await fetchMenuItems();
}

export async function getDishesByCategory(category) {
  const items = await fetchMenuItems();
  return items.filter(item => item.category === category);
}

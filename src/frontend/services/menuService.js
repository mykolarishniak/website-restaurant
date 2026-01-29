import { db } from '../../firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';

const MENU_COLLECTION = 'menuItems';

export async function getMenuItems() {
  try {
    const querySnapshot = await getDocs(collection(db, MENU_COLLECTION));
    return querySnapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.error('Помилка отримання меню:', error);
    return [];
  }
}

export async function saveMenuItems(items) {
  try {
    const batch = writeBatch(db);
    items.forEach(item => {
      const docRef = doc(collection(db, MENU_COLLECTION));
      batch.set(docRef, {
        ...item,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    });
    await batch.commit();
    return { success: true };
  } catch (error) {
    console.error('Помилка збереження меню:', error);
    return { success: false, error };
  }
}

export async function addDish({ title, category, imgSrc, price }) {
  try {
    const docRef = await addDoc(collection(db, MENU_COLLECTION), {
      title,
      category,
      imgSrc,
      price: Number(price),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const newDish = {
      id: docRef.id,
      title,
      category,
      imgSrc,
      price: Number(price),
    };

    return { success: true, dish: newDish };
  } catch (error) {
    console.error('Помилка додавання страви:', error);
    return { success: false, error };
  }
}

export async function updateDish(id, data) {
  try {
    const docRef = doc(db, MENU_COLLECTION, id);
    const updateData = {
      ...data,
      updatedAt: serverTimestamp(),
    };
    if (data.price) {
      updateData.price = Number(data.price);
    }

    await updateDoc(docRef, updateData);

    return { success: true, dish: { id, ...data } };
  } catch (error) {
    console.error('Помилка редагування:', error);
    if (error.code === 'not-found') {
      alert('Страву не знайдено');
    }
    return { success: false, error };
  }
}

export async function deleteDish(id) {
  try {
    await deleteDoc(doc(db, MENU_COLLECTION, id));
    return { success: true };
  } catch (error) {
    console.error('Помилка видалення:', error);
    alert('Страву з таким ID не знайдено');
    return { success: false, error };
  }
}

export async function getItemsByCategory(category) {
  try {
    const q = query(collection(db, MENU_COLLECTION), where('category', '==', category));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.error('Помилка отримання категорії:', error);
    return [];
  }
}

import { auth, db } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

export function validateRegistrationData({ username, email, password }) {
  const errors = {};

  if (!username.trim()) {
    errors.username = "Ім'я користувача не може бути порожнім";
  }

  if (!email.includes('@') || email.length < 5) {
    errors.email = 'Некоректний email';
  }

  if (password.length < 8) {
    errors.password = 'Пароль має містити мінімум 8 символів';
  }

  if (Object.keys(errors).length > 0) {
    const messages = Object.values(errors).join('\n');
    alert(messages);
  }

  return errors;
}

export async function registerUser({ username, email, password }) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    await updateProfile(firebaseUser, { displayName: username });

    await setDoc(doc(db, 'users', firebaseUser.uid), {
      uid: firebaseUser.uid,
      username,
      email,
      role: 'user',
      createdAt: serverTimestamp(),
    });

    const user = {
      id: firebaseUser.uid,
      username,
      email,
      role: 'user',
    };

    alert('Успішно зареєстровано');
    return { message: 'Успішно зареєстровано', user };
  } catch (error) {
    let message = 'Помилка реєстрації';
    if (error.code === 'auth/email-already-in-use') {
      message = 'Користувач з таким email вже існує';
    }
    alert(message);
    throw { message };
  }
}

export async function loginUser({ email, password }) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    const userData = userDoc.data();

    const user = {
      id: firebaseUser.uid,
      username: userData?.username || firebaseUser.displayName || email,
      email: firebaseUser.email,
      role: userData?.role || 'user',
    };

    alert('Успішний вхід');
    return { message: 'Успішний вхід', user };
  } catch (error) {
    alert('Невірний email або пароль');
    throw { message: 'Невірний email або пароль' };
  }
}

export function getCurrentUser() {
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) return null;

  return {
    id: firebaseUser.uid,
    username: firebaseUser.displayName || firebaseUser.email,
    email: firebaseUser.email,
  };
}

export async function logoutUser() {
  await signOut(auth);
  alert('Ви вийшли з акаунту');
}

export const authService = {
  login: loginUser,
  logout: logoutUser,
  register: registerUser,
  getCurrentUser,
};

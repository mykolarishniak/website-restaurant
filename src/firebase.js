import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD5mQ27a_8umVsKQ8TuxnAl0SYINtsSuXQ',
  authDomain: 'website-restaurant-79970.firebaseapp.com',
  projectId: 'website-restaurant-79970',
  storageBucket: 'website-restaurant-79970.firebasestorage.app',
  messagingSenderId: '453012840165',
  appId: '1:453012840165:web:ce25de388e15ef9c69be0c',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
export default app;

import { createContext, useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.data();

          setUser({
            id: firebaseUser.uid,
            username: userData?.username || firebaseUser.displayName || firebaseUser.email,
            email: firebaseUser.email,
            role: userData?.role || 'user',
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser({
            id: firebaseUser.uid,
            username: firebaseUser.displayName || firebaseUser.email,
            email: firebaseUser.email,
            role: 'user',
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>{children}</AuthContext.Provider>
  );
}

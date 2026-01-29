import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.data();
          setUser({
            id: firebaseUser.uid,
            username: userData?.username || firebaseUser.displayName,
            email: firebaseUser.email,
            role: userData?.role || 'user',
          });
        } catch (error) {
          setUser({
            id: firebaseUser.uid,
            username: firebaseUser.displayName,
            email: firebaseUser.email,
            role: 'user',
          });
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const login = userData => {
    setUser(userData);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};

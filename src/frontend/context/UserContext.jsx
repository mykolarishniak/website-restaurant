import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (window.__TEST_USER__) {
    console.log("UserContext: TEST USER USED", window.__TEST_USER__);
    setUser(window.__TEST_USER__);
    return;
  }
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('UserContext check, firebaseUser:', firebaseUser);

      if (!firebaseUser) {
        setUser(null);
        console.log('UserContext loaded: no user');
        return;
      }

      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', firebaseUser.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          console.log('UserContext loaded userData from Firestore:', docData);
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email,
            username: docData.username || firebaseUser.displayName,
            role: docData.role || 'user',
          });
        } else {
          console.log('UserContext: user not found in Firestore');
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email,
            username: firebaseUser.displayName || null,
            role: 'user',
          });
        }
      } catch (error) {
        console.error('UserContext error loading Firestore user:', error);
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          username: firebaseUser.displayName || null,
          role: 'user',
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const login = (userData) => setUser(userData);
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};

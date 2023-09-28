import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { useEffect, useState, useCallback } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyDz8mJFpFpdA2hJoO1z3MizYOhygsc038U",
  authDomain: "andrewreacttrain.firebaseapp.com",
  databaseURL: "https://andrewreacttrain-default-rtdb.firebaseio.com",
  projectId: "andrewreacttrain",
  storageBucket: "andrewreacttrain.appspot.com",
  messagingSenderId: "783373355244",
  appId: "1:783373355244:web:9fea2676dd5f9e49aa7dc9"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const useDbData = (path) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dataRef = ref(database, path);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      setData(fetchedData);
    }, (error) => {
      setError(error);
    });
    return () => unsubscribe();
  }, [path]);

  return [data, error];
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState(null);

  const updateData = useCallback((value) => {
    const dataRef = ref(database, path);
    update(dataRef, value)
      .then(() => setResult({ success: true }))
      .catch((error) => setResult({ success: false, error }));
  }, [path]);

  return [updateData, result];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(), new GoogleAuthProvider());
};

export const firebaseSignOut = () => {
  signOut(getAuth());
};

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => (
    onAuthStateChanged(getAuth(), setUser)
  ), []);

  return [user];
};

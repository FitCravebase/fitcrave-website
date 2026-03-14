import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBE1bAuDhWVl1qcyDKcSzSh-dg53ColgSw",
  authDomain: "fitcrave-39bdc.firebaseapp.com",
  projectId: "fitcrave-39bdc",
  storageBucket: "fitcrave-39bdc.firebasestorage.app",
  messagingSenderId: "1062412489665",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

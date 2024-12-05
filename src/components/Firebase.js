import { initializeApp } from 'firebase/app'; 
import { getAuth } from 'firebase/auth'; 
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAgJZDvkl9fHtxabrumlq1VgQIZ8PDPYxg",
  authDomain: "minorio-12086.firebaseapp.com",
  projectId: "minorio-12086",
  storageBucket: "minorio-12086.firebasestorage.app",
  messagingSenderId: "905312758770",
  appId: "1:905312758770:web:8cffa0d65a6c9cd959996b",
  measurementId: "G-H87Q0YRHQ4"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
import { initializeApp } from 'firebase/app'; // Initialize Firebase app
import { getAuth } from 'firebase/auth'; // Get Firebase Auth instance

const firebaseConfig = {
  apiKey: "AIzaSyAgJZDvkl9fHtxabrumlq1VgQIZ8PDPYxg",
  authDomain: "minorio-12086.firebaseapp.com",
  projectId: "minorio-12086",
  storageBucket: "minorio-12086.firebasestorage.app",
  messagingSenderId: "905312758770",
  appId: "1:905312758770:web:8cffa0d65a6c9cd959996b",
  measurementId: "G-H87Q0YRHQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth };
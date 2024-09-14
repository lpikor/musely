// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Dodajemy Firebase Auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3FzcfmTKD6KlE9i-uOJxmoFfU6HcQIrk",
  authDomain: "musely-36fc1.firebaseapp.com",
  projectId: "musely-36fc1",
  storageBucket: "musely-36fc1.appspot.com",
  messagingSenderId: "568605080782",
  appId: "1:568605080782:web:4348f30ba288f3cdb0649f",
  measurementId: "G-0W4MGDVNRG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Inicjalizujemy Firebase Auth
const analytics = getAnalytics(app);

console.log(analytics);

export { db, auth };

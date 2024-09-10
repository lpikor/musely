// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

console.log(analytics);

export default app;
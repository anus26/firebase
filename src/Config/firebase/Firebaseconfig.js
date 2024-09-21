// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD9ilyOWp2935lOCEyoa01xDUuBEcNPfXs",
  authDomain: "react-firebase-25923.firebaseapp.com",
  projectId: "react-firebase-25923",
  storageBucket: "react-firebase-25923.appspot.com",
  messagingSenderId: "85608505902",
  appId: "1:85608505902:web:765c1cbdc24a6e04e8f5bf",
  measurementId: "G-9S5CK3TBL8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
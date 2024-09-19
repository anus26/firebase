// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
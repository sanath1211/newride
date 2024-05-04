// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9zXZctmxGAmHFXei6JePbylJe7wjM3NU",
  authDomain: "curvyroads-58368.firebaseapp.com",
  projectId: "curvyroads-58368",
  storageBucket: "curvyroads-58368.appspot.com",
  messagingSenderId: "141587975833",
  appId: "1:141587975833:web:73468b7753fcfd7d45b208",
  measurementId: "G-XGGK12PPWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



//firestore
export const db = getFirestore(app);
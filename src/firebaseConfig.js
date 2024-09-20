// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTdxR-yefxA0sxwcBVa2cq_WXt98Tetls",
  authDomain: "e-commerce-trabalho-c804a.firebaseapp.com",
  projectId: "e-commerce-trabalho-c804a",
  storageBucket: "e-commerce-trabalho-c804a.appspot.com",
  messagingSenderId: "969518154241",
  appId: "1:969518154241:web:14418b5810c6a004013600"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app)

export { db };
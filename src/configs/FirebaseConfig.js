// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDh4baEeuxkjSAAMGmzb1mQOZxnzpLTr0Y",
  authDomain: "reactjs-blogging-app.firebaseapp.com",
  projectId: "reactjs-blogging-app",
  storageBucket: "reactjs-blogging-app.appspot.com",
  messagingSenderId: "800780980478",
  appId: "1:800780980478:web:e0fc16e758029ca52ed5af",
  measurementId: "G-R9EXEQJGH7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
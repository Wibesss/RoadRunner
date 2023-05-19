// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZMWqN1MeQtBNpMgYjTNX_lRHytFNObA0",
  authDomain: "swestorage-e02d2.firebaseapp.com",
  projectId: "swestorage-e02d2",
  storageBucket: "swestorage-e02d2.appspot.com",
  messagingSenderId: "1035227122651",
  appId: "1:1035227122651:web:b9f5d338442e5d212335fe",
  measurementId: "G-1PWBLSH35Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Replace the configuration below with your Firebase project's config
const firebaseConfig = {
    apiKey: "AIzaSyCCe_H7JWChegUvjugESwF_l-M6ixq9yOc",
    authDomain: "vitu-realty--website.firebaseapp.com",
    projectId: "vitu-realty--website",
    storageBucket: "vitu-realty--website.firebasestorage.app",
    messagingSenderId: "507741321339",
    appId: "1:507741321339:web:79b72ae7f8c78436b20ade",
    measurementId: "G-64MSFS4QMM"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const storage = getStorage(app);
export const db = getFirestore(app);

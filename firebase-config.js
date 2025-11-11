// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDvVUrCLZj3Afu5MFqu5EhOGejyTfqEjgY",
  authDomain: "suggestion-box-4b869.firebaseapp.com",
  projectId: "suggestion-box-4b869",
  storageBucket: "suggestion-box-4b869.firebasestorage.app",
  messagingSenderId: "263926556991",
  appId: "1:263926556991:web:8c1f585f1f42fb72664b8a",
  measurementId: "G-RHHQJE2Y6B"
};

// Initialize Firebase and export Firestore
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

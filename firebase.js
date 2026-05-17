// FIREBASE APP
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// FIREBASE AUTH
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// FIREBASE FIRESTORE
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// CONFIG FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyD7vGS1Xpzw145DziLUt9FwyClV7s1lebI",
  authDomain: "true-friendsreal.firebaseapp.com",
  projectId: "true-friendsreal",
  storageBucket: "true-friendsreal.firebasestorage.app",
  messagingSenderId: "219770057635",
  appId: "1:219770057635:web:73ba7e5ac6a095b9b06016"
};

// INICIAR FIREBASE
const app = initializeApp(firebaseConfig);

// EXPORTS
export const auth = getAuth(app);
export const db = getFirestore(app);


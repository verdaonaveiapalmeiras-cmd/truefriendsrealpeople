// Firebase base config (TRUE FRIENDS)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

// CONFIG DO SEU PROJETO
const firebaseConfig = {
  apiKey: "AIzaSyD7vGS1Xpzw145DziLUt9FwyClV7s1lebI",
  authDomain: "true-friendsreal.firebaseapp.com",
  projectId: "true-friendsreal",
  storageBucket: "true-friendsreal.appspot.com",
  messagingSenderId: "219770057635",
  appId: "1:219770057635:web:73ba7e5ac6a095b9b06016"
};

// INICIALIZAÇÃO
const app = initializeApp(firebaseConfig);

// SERVIÇOS
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

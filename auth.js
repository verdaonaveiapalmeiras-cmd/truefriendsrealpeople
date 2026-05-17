import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export let currentUser = null;

export async function register(email, password, name) {

  if (!email || !password || !name) {
    alert("Preencha todos os campos");
    return;
  }

  const userCred = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(userCred.user, {
    displayName: name
  });

  await setDoc(doc(db, "users", userCred.user.uid), {
    name,
    email,
    createdAt: serverTimestamp()
  });

  return userCred.user;
}

export async function login(email, password) {

  if (!email || !password) {
    alert("Preencha email e senha");
    return;
  }

  const userCred = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCred.user;
}

export async function logout() {
  return await signOut(auth);
}

export function initAuthListener(callback) {
  onAuthStateChanged(auth, (user) => {
    currentUser = user;
    callback(user);
  });
}

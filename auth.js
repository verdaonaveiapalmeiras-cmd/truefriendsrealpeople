import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
updateProfile,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

import {
doc,
setDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

/* =========================
   ESTADO DO USUÁRIO
========================= */

export let currentUser = null;

/* =========================
   CADASTRO
========================= */

export async function register(email, password, name) {
const userCred = await createUserWithEmailAndPassword(auth, email, password);

await updateProfile(userCred.user, {
displayName: name
});

// salva no Firestore
await setDoc(doc(db, "users", userCred.user.uid), {
name,
email,
createdAt: serverTimestamp()
});

return userCred.user;
}

/* =========================
   LOGIN
========================= */

export async function login(email, password) {
const userCred = await signInWithEmailAndPassword(auth, email, password);
return userCred.user;
}

/* =========================
   LOGOUT
========================= */

export async function logout() {
return await signOut(auth);
}

/* =========================
   LISTENER DE AUTH
========================= */

export function initAuthListener(callback) {
onAuthStateChanged(auth, (user) => {
currentUser = user;
callback(user);
});
}

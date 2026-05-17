import { db, storage } from "./firebase.js";
import { currentUser } from "./auth.js";

import {
collection,
addDoc,
query,
orderBy,
onSnapshot,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

import {
ref,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

/* =========================
   CRIAR POST
========================= */

export async function createPost(text, file) {

let mediaURL = "";
let mediaType = "";

if (file) {
const storageRef = ref(storage, "posts/" + Date.now() + "_" + file.name);

const snap = await uploadBytes(storageRef, file);

mediaURL = await getDownloadURL(snap.ref);
mediaType = file.type;
}

await addDoc(collection(db, "posts"), {
text,
mediaURL,
mediaType,
userId: currentUser.uid,
name: currentUser.displayName,
createdAt: serverTimestamp()
});
}

/* =========================
   CARREGAR FEED (REALTIME)
========================= */

export function loadFeed(callback) {

const q = query(
collection(db, "posts"),
orderBy("createdAt", "desc")
);

onSnapshot(q, (snapshot) => {

const posts = [];

snapshot.forEach((doc) => {
posts.push({
id: doc.id,
...doc.data()
});
});

callback(posts);

});
}

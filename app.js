import { initAuthListener, login, register, logout, currentUser } from "./auth.js";
import { loadFeed, createPost } from "./feed.js";

/* =========================
   ELEMENTOS DOM
========================= */

const loginPage = document.getElementById("loginPage");
const cadastroPage = document.getElementById("cadastroPage");
const feedPage = document.getElementById("feedPage");

const loginEmail = document.getElementById("loginEmail");
const loginSenha = document.getElementById("loginSenha");
const loginBtn = document.getElementById("loginBtn");

const cadNome = document.getElementById("cadNome");
const cadEmail = document.getElementById("cadEmail");
const cadSenha = document.getElementById("cadSenha");
const cadastroBtn = document.getElementById("cadastroBtn");

const logoutBtn = document.getElementById("logoutBtn");

const textoPost = document.getElementById("textoPost");
const arquivoPost = document.getElementById("arquivoPost");
const publicarBtn = document.getElementById("publicarBtn");

const feed = document.getElementById("feed");
const nomeUsuario = document.getElementById("nomeUsuario");

/* =========================
   TROCA DE TELAS
========================= */

function show(page) {
loginPage.classList.add("hidden");
cadastroPage.classList.add("hidden");
feedPage.classList.add("hidden");

document.getElementById(page).classList.remove("hidden");
}

/* =========================
   LOGIN
========================= */

loginBtn.onclick = async () => {
try {
await login(loginEmail.value, loginSenha.value);
} catch (e) {
alert(e.message);
}
};

/* =========================
   CADASTRO
========================= */

cadastroBtn.onclick = async () => {
try {
await register(cadEmail.value, cadSenha.value, cadNome.value);
} catch (e) {
alert(e.message);
}
};

/* =========================
   LOGOUT
========================= */

logoutBtn.onclick = async () => {
await logout();
};

/* =========================
   PUBLICAR POST
========================= */

publicarBtn.onclick = async () => {
if (!currentUser) return;

await createPost(textoPost.value, arquivoPost.files[0]);

textoPost.value = "";
arquivoPost.value = null;
};

/* =========================
   RENDER FEED
========================= */

function renderFeed(posts) {

feed.innerHTML = "";

posts.forEach(post => {

feed.innerHTML += `
<div class="card">
<b>${post.name || "Anônimo"}</b>
<p>${post.text || ""}</p>

${post.mediaURL ? `
<img src="${post.mediaURL}" style="max-width:100%;border-radius:10px;">
` : ""}
</div>
`;

});

}

/* =========================
   AUTH LISTENER
========================= */

initAuthListener((user) => {

if (user) {
show("feedPage");
nomeUsuario.innerText = user.displayName || user.email;

loadFeed(renderFeed);

} else {
show("loginPage");
}

});

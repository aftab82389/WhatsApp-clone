const name = document.querySelector('#name');
const phone = document.querySelector('#phone');
const signup = document.querySelector('#signup');
const password = document.querySelector('#password');
const confPassword = document.querySelector('#confPassword');
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
const firebaseConfig = {
  apiKey: "AIzaSyDBatjj-Nojhhfhk_d6VAVgtfTLupLwyQw",
  authDomain: "whatsapp-clone-29b9a.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-29b9a-default-rtdb.firebaseio.com",
  projectId: "whatsapp-clone-29b9a",
  storageBucket: "whatsapp-clone-29b9a.firebasestorage.app",
  messagingSenderId: "513887418951",
  appId: "1:513887418951:web:769a1daba2795214c04f62"
};
const app = initializeApp(firebaseConfig);
import { getDatabase, ref, set, child, update, remove }
from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
const db = getDatabase();

function insert() {
  console.log(name.value, phone.value)
  set(ref(db, "Accounts/" + phone.value), {
      Name: name.value,
      Phone: phone.value,
      Password: password.value
    })
    .then(() => {
      alert('succesful');
      window.location = "login.html"
    })
    .catch((error) => {
      alert(error)
    })
}

function signupId() {
  if ((name.value != "") && (phone.value != "") && (password.value != "") && (confPassword != "")) {
    if (password.value === confPassword.value) {
      insert();
    }
    else {
      alert("password and confirm doesn't matched")
    }
  }
  else {
    alert('Complete field');
  }
}
signup.addEventListener('click', () => {
  signupId()
})

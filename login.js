const phone=document.querySelector('#phone');
    const password=document.querySelector('#password');
    const login=document.querySelector('#login');
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBatjj-Nojhhfhk_d6VAVgtfTLupLwyQw",
  authDomain: "whatsapp-clone-29b9a.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-29b9a-default-rtdb.firebaseio.com",
  projectId: "whatsapp-clone-29b9a",
  storageBucket: "whatsapp-clone-29b9a.appspot.com",
  messagingSenderId: "513887418951",
  appId: "1:513887418951:web:769a1daba2795214c04f62"
};

let data = {};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Fetch Data from Firebase
function fetchAllReviews() {
  const reviewsRef = ref(db, "Accounts");

  onValue(reviewsRef, (snapshot) => {
    if (snapshot.exists()) {
      data = snapshot.val();
      console.log('Data fetched:', data);
    } else {
      console.log('No contacts found');
    }
  });
}

fetchAllReviews();

// Login Function
function Login() {
  window.location = "index.html"; 
  localStorage.setItem("Phone",phone.value);
  console.log(localStorage.getItem("Phone"))// Redirect to index.html on successful login
}

// Event Listener for Login Button
login.addEventListener('click', () => {
  const phoneValue = phone.value.trim();
  const passValue = password.value.trim();

  if (!phoneValue || !passValue) {
    console.log("Please fill out both fields.");
    return;
  }

  let userFound = false;

  Object.keys(data).forEach((key) => {
    if (data[key].Phone === phoneValue && data[key].Password === passValue) {
      userFound = true;
      console.log(`User Found: ${data[key].Name}`);
      Login();
    }
  });

  if (!userFound) {
    console.log('Incorrect phone number or password.');
  }
});

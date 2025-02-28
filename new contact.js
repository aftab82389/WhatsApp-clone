const fname = document.querySelector('#fname');
const lname = document.querySelector('#lname');
const phone = document.querySelector('#phone');
const save = document.querySelector('#save');
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
import {_name} from "login.html";
console.log(_name)
const app = initializeApp(firebaseConfig);
import { getDatabase, ref, set, child, update, remove }
from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
const db = getDatabase();

function insert() {
  set(ref(db, "whatsapp-" + phone.value), {
      Fname: fname.value,
      Lname: lname.value,
      Phone: phone.value
    })
    .then(() => {
      alert('succesful');
    })
    .catch((error) => {
      alert(error)
    })
}
let name_ ="";
function getdata() {
  const dbref = ref(db);
  get(child(dbref, "whatsapp-" + phone.value))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
         name_ = data.Fname + " " + data.Lname;
        let mob = data.Phone;
        console.log(name_, mob);
        alert("data retrive");
      }
      else {
        console.log("No data found for this enrollment number");
      }
    })
    .catch((error) => {
      alert("Unsuccessful, error: " + error.message);
    });
  
}
save.addEventListener('click', () => {
  insert();
  getdata();
})
function chats(){
  let contact = document.createElement('div');
    contact.className = 'contact';
    let dp = document.createElement('img');
    dp.src = 'https://raw.githubusercontent.com/aftab82389/WhatsApp-clone/refs/heads/main/c0039ac9d3ac13d344ea9dfd566a3a08.jpg';
    dp.style.width="50"+"px";
    dp.style.height="50"+"px"; 
    dp.style.margin="10px";
    contact.appendChild(dp);
    let name = document.createElement('div');
    name.className = 'name';
    name.innerHTML=name_;
    name.style.color="#fff";
    contact.appendChild(name);
    document.body.appendChild(contact)
    console.log(name.innerHTML)
}
chats()
        

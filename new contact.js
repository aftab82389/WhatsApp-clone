const fname = document.querySelector('#fname');
const lname = document.querySelector('#lname');
const phone = document.querySelector('#phone');
const save = document.querySelector('#save');
const contactList = document.querySelector('.footer');
export default phone.value;
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Validation function
function validation() {
  if (!fname.value || !phone.value) {
    alert('Please fill in all fields.');
    return false;
  }
  return true;
}

// Insert data into Firebase
function insert() {
  set(ref(db, "Accounts/"+localStorage.getItem("Phone")+"/Contact/"+phone.value), {
    Fname: fname.value,
    Lname: lname.value,
    Phone: phone.value
  })
  .then(() => {
    alert('Contact added successfully!');
    fname.value = "";
    lname.value = "";
    phone.value = "";
  })
  .catch((error) => {
    alert(error.message);
  });
}
function contactValidation(){
  if(phone.value.length ==10){
  const validate=ref(db,"Accounts/"+phone.value);
  onValue(validate,(snapshot)=> {
    if(snapshot.exists()){
      const data=snapshot.val()
      console.log(data.Phone,"found")
    }
    else{
      console.log("not found")
    }
  })
}
}
phone.addEventListener('input',()=>{
  contactValidation()
})
// Fetch all contacts
function fetchAllReviews() {
  const reviewsRef = ref(db, "Accounts/"+localStorage.getItem("Phone")+"/Contact/"+phone.value);

  // Listen for real-time updates
  onValue(reviewsRef, (snapshot) => {
    contactList.innerHTML = ""; 
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log(snapshot.val())
      console.log(data.Phone)
      Object.keys(data).forEach((key) => {
        const { Fname, Lname ,Phone} = data[key];
        chats(Fname + " " + Lname,Phone);
        console.log(Phone)
      });
    } else {
      contactList.innerHTML = "<p style='color:white;'>No contacts found</p>";
    }
  });
}

// Create chat UI
function chats(fullName,Phone) {
  let contact = document.createElement('div');
  contact.className = 'contactname';

  let dp = document.createElement('img');
  dp.src = 'https://raw.githubusercontent.com/aftab82389/WhatsApp-clone/refs/heads/main/c0039ac9d3ac13d344ea9dfd566a3a08.jpg';
  dp.style.width = "50px";
  dp.style.height = "50px";
  dp.style.margin = "10px 0px";

  let name = document.createElement('div');
  name.className = 'name';
  name.innerHTML = fullName;
  name.style.color = "#fff";

  contact.appendChild(dp);
  contact.appendChild(name);
  contactList.appendChild(contact);
  contact.addEventListener('click',()=>{
  console.log(Phone)
  })
}

// Save button event listener
save.addEventListener('click', () => {
  if (validation()) {
    insert();
  }
});

// Fetch contacts on page load
fetchAllReviews();
document.querySelector('.ri-arrow-left-line').addEventListener('click',()=>{
  window.location="index.html"
})

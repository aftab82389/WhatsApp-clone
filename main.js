// Create and append container for profiles
let profiles = document.createElement('div');
profiles.className = 'profiles-container';
let mainDiv=document.querySelector('.main');
mainDiv.appendChild(profiles);
let searchbar=document.querySelector('#searchbar');
// Store names in array (optional)
let nameObject = [];
let user=document.querySelector('#userName');
let logoutDiv=document.querySelector('#logOut');
let logout=document.querySelector('.ri-shut-down-line');
logout.addEventListener('click',() =>{
  mainDiv.style.display="none";
  logoutDiv.style.display="flex";
})
let yes=document.querySelector('#yes');
let no=document.querySelector('#no');
yes.addEventListener('click',() =>{
  localStorage.setItem("Phone","")
  localStorage.setItem("Friend","");
  window.location="login.html"
})
no.addEventListener('click',() =>{
  mainDiv.style.display="block";
  logoutDiv.style.display="none";
})
// Function to create a profile dynamically
function createProfile(Fname, Lname, Phone) {
  let profile = document.createElement('div');
  profile.className = 'profile';
  profile.dataset.phone = Phone; // Store phone for click event

  let dp = document.createElement('img');
  dp.src = 'https://raw.githubusercontent.com/aftab82389/WhatsApp-clone/refs/heads/main/c0039ac9d3ac13d344ea9dfd566a3a08.jpg';
  profile.appendChild(dp);

  let title = document.createElement('div');
  title.className = 'title';
  profile.appendChild(title);

  let subtitle = document.createElement('div');
  subtitle.className = 'subtitle';
  title.appendChild(subtitle);

  let name = document.createElement('p');
  name.className = 'name';
  name.innerHTML = Fname + " " + Lname;
  subtitle.appendChild(name);

  let t_msg = document.createElement('p');
  t_msg.className = 't_msg';
  t_msg.innerHTML = ''; // Optional: Replace with last message from DB
  subtitle.appendChild(t_msg);

  let l_seen = document.createElement('p');
  l_seen.className = 'l_seen';
  l_seen.innerHTML = '12:35 AM'; // Optional: Replace with last seen timestamp
  title.appendChild(l_seen);

  profiles.appendChild(profile);
  nameObject.push(name.innerText);
  lmsg(Phone,t_msg,l_seen)
}

// Button for adding new contact
const create = document.querySelector('.new');
if (create) {
  create.addEventListener('click', () => {
    window.location = "new contact.html";
    console.log("Redirecting to new contact page...");
  });
}

// Handle profile click to open chat and store friend number
profiles.addEventListener('click', (e) => {
  const clickedProfile = e.target.closest('.profile');
  if (clickedProfile) {
    const phone = clickedProfile.dataset.phone;
    if (phone) {
      localStorage.setItem("Friend", phone);
      window.location = "chat.html";
    }
  }
});

// Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

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
const phone = localStorage.getItem("Phone");

function getuserName(){
  const userRef=ref(db, "Accounts/" + phone + "/Name");
    onValue(userRef, (snapshot) =>{
      const userName=snapshot.val();
      user.innerHTML=userName;
    })
}
getuserName();
// Fetch and display all contacts
function fetchAllContacts() {
  if (!phone) {
    profiles.innerHTML = "<p style='color:white; text-align:center;'>User not logged in</p>";
    window.location="login.html";
    return;
  }

  const contactsRef = ref(db, "Accounts/" + phone + "/Contact/");

  onValue(contactsRef, (snapshot) => {
    profiles.innerHTML = ""; // Clear previous contacts

    if (snapshot.exists()) {
      const data = snapshot.val();
      Object.keys(data).forEach((key) => {
        const { Fname, Lname, Phone } = data[key];
        createProfile(Fname, Lname, Phone);
        
      });
    } 
    else {
      profiles. innerHTML = "<p style='color:white; text-align:center;'>No contacts found</p>";
    }
  });
}
// Call on page load
fetchAllContacts();
function lmsg(Phone,t_msg,l_seen){
  const tmsg = ref(db, "Accounts/" + phone + "/Contact/"+Phone+"/Chats/");
  onValue(tmsg, (snapshot) => {
 // Clear previous contacts

    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log(data)
      Object.keys(data).forEach((key) => {
        const Tmsg= data[key];
        t_msg.innerHTML = Tmsg.text;
       let Timestamp= new Date(Tmsg.timestamp);
        l_seen.innerHTML=Timestamp.toLocaleTimeString([],{
          hour:'2-digit',
          minute:'2-digit',
          hour12:true
        });
      });
    } 
    else {
      console.log("<p style='color:white; text-align:center;'>No contacts found</p>");
    }
  });
} 

// Activate search bar functionality
searchbar.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const allProfiles = document.querySelectorAll('.profile');
  
  allProfiles.forEach(profile => {
    const nameElement = profile.querySelector('.name');
    const name = nameElement.textContent.toLowerCase();
    
    if (name.includes(searchTerm)) {
      profile.style.display = 'flex'; // Show matching profiles
    } else {
      profile.style.display = 'none'; // Hide non-matching profiles
    }
  });
});

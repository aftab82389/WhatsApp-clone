        const fname = document.querySelector('#fname').value;
        const lname = document.querySelector('#lname').value;
        const phone = document.querySelector('#phone').value;
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
  const app = initializeApp(firebaseConfig);
  import { getDatabase, ref, set, child, update, remove } 
  from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
  const db = getDatabase();
  function insert(){
  set(ref(db,"whatsapp-"+ phone),{
    Fname : fname,
    Lname : lname,
    Phone : phone
  })
  .then(()=>{
    alert('succesful');
    console.log(fname,lname,phone);
  })
  .catch((error)=>{
    alert(error)
  })
  }
  save.addEventListener('click',()=>{
    insert();
  })
        

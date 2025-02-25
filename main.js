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
    
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        import { getDatabase, get, ref, set, child, update, remove }
            from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
        const App = initializeApp(firebaseConfig);
        const db = getDatabase(App);
        function saveData() {
    
            set(ref(db, "WhatsApp-clone/" + phone), {
                Fname: fname.value,
                Lname: lname.value,
                Phone: phone.value
            })
                .then(() => {
                    console.log("Data successfully store");
                    alert("Form Submission Successful");
    
                })
                .catch((error) => {
                    alert("Unsuccessful,error " + error)
                })
        }
        save.addEventListener('click', () => {
            saveData();
        })

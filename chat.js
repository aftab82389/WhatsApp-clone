import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
    import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
    
    // Firebase config
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
    
    // DOM elements
    const chatbox = document.getElementById("chatbox");
    const sendBtn = document.querySelector(".sendBtn");
    const messages = document.getElementById("messages");
    const friendNameEl = document.getElementById("friendName");
    
    // Phone setup
    let myPhone = localStorage.getItem("Phone");
    if (!myPhone) {
      myPhone = prompt("Enter your phone number:");
      localStorage.setItem("Phone", myPhone);
    }
    
    let friendPhone = localStorage.getItem("Friend");
    if (!friendPhone) {
      friendPhone = prompt("Enter your friend's number:");
      localStorage.setItem("Friend", friendPhone);
    }
    
    friendNameEl.innerText = friendPhone;
    
    // Send message function
    function insertMessage(receiverPhone, message) {
      const timestamp = Date.now();
      const messageData = {
        text: message,
        from: myPhone
      };
      
      // Save for sender
      set(ref(db, `Accounts/${myPhone}/Contact/Chats/${myPhone}/${receiverPhone}/${timestamp}`), messageData);
      
      // Save for receiver
      set(ref(db, `Accounts/${receiverPhone}/Contact/Chats/${receiverPhone}/${myPhone}/${timestamp}`), messageData);
    }
    
    // Display message
    function displayMessage(text, from) {
      const msg = document.createElement("div");
      msg.className = from === myPhone ? "sent" : "received";
      msg.innerText = text;
      messages.appendChild(msg);
      messages.scrollTop = messages.scrollHeight;
    }
    
    // Listen for messages
    function listenForMessages(friend) {
      const chatRef = ref(db, `Accounts/${myPhone}/Contact/Chats/${myPhone}/${friend}`);
      messages.innerHTML = "";
      onValue(chatRef, (snapshot) => {
        messages.innerHTML = "";
        if (!snapshot.exists()) {
          messages.innerHTML = "<p style='color:gray;'>No messages yet.</p>";
          return;
        }
        snapshot.forEach(child => {
          const msg = child.val();
          displayMessage(msg.text, msg.from);
        });
      });
    }
    
    // Send button click
    sendBtn.addEventListener("click", () => {
      const msg = chatbox.value.trim();
      if (msg && friendPhone) {
        insertMessage(friendPhone, msg);
        chatbox.value = "";
      }
    });
    
    // Enter key sends message
    chatbox.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        sendBtn.click();
      }
    });
    
    // On page load, start listening
    window.onload = () => {
      listenForMessages(friendPhone);
    };

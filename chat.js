import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, set, onValue, serverTimestamp, onDisconnect } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

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
const onlineStatusEl = document.getElementById("onlineStatus");

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
function friendNameFinder(){
  const friendNameRef=ref(db, `Accounts/${friendPhone}/Name`);
  onValue(friendNameRef, (snapshot) => {
    
    const Name = snapshot.val();
    if (Name) {
      friendNameEl.innerText = Name;
    }
    else{
      friendNameEl.innerText = friendPhone;
    }
})
}


// Set up online presence
function setupPresence() {
  const userStatusRef = ref(db, `Accounts/${myPhone}/status`);
  
  // Set user to online
  set(userStatusRef, {
    online: true,
    lastSeen: serverTimestamp()
  });
  
  // Set user to offline when they disconnect
  onDisconnect(userStatusRef).update({
    online: false,
    lastSeen: serverTimestamp()
  });
}

// Monitor friend's online status
function monitorFriendStatus(friendPhone) {
  const friendStatusRef = ref(db, `Accounts/${friendPhone}/status`);
  
  onValue(friendStatusRef, (snapshot) => {
    const status = snapshot.val();
    if (status) {
      if (status.online) {
        onlineStatusEl.textContent = "Online";
        onlineStatusEl.style.color = "green";
      } else {
        if (status.lastSeen) {
          const lastSeenDate = new Date(status.lastSeen);
          onlineStatusEl.textContent = `Last seen ${formatLastSeenTime(status.lastSeen)}`;
          onlineStatusEl.style.color = "gray";
        } else {
          onlineStatusEl.textContent = "Offline";
          onlineStatusEl.style.color = "gray";
        }
      }
    }
  });
}

// Format time for messages
function formatTime(timestamp) {
  if (!timestamp) return "";
  
  const date = typeof timestamp === 'number' ? new Date(timestamp) : new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Format last seen time
function formatLastSeenTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = (now - date) / (1000 * 60);
  
  if (diffInMinutes < 1) {
    return "just now";
  } else if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)} minutes ago`;
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)} hours ago`;
  } else {
    return date.toLocaleDateString();
  }
}

// Format date header (e.g., "Today", "Yesterday", or specific date)
function formatDateHeader(timestamp) {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Reset time part for comparison
  const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const compareToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const compareYesterday = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());

  if (compareDate.getTime() === compareToday.getTime()) {
    return "Today";
  } else if (compareDate.getTime() === compareYesterday.getTime()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }
}

// Display date header
function displayDateHeader(timestamp) {
  const header = document.createElement("div");
  header.className = "date-header";
  header.textContent = formatDateHeader(timestamp);
  messages.appendChild(header);
}

// Display message
function displayMessage(text, from, timestamp, isNewDay) {
  if (isNewDay) {
    displayDateHeader(timestamp);
  }

  const msgContainer = document.createElement("div");
  msgContainer.className = from === myPhone ? "message-container sent" : "message-container received";
  
  const msg = document.createElement("div");
  msg.className = "message";
  msg.innerText = text;
  
  const time = document.createElement("div");
  time.className = "message-time";
  time.innerText = formatTime(timestamp);
  
  msgContainer.appendChild(msg);
  msgContainer.appendChild(time);
  messages.appendChild(msgContainer);
  messages.scrollTop = messages.scrollHeight;
}

// Send message function
function insertMessage(receiverPhone, message) {
  const timestamp = Date.now();
  const messageData = {
    text: message,
    from: myPhone,
    timestamp: timestamp
  };
  
  // Save for sender
  set(ref(db, `Accounts/${myPhone}/Contact/${receiverPhone}/Chats/${timestamp}`), messageData);
  
  // Save for receiver
  set(ref(db, `Accounts/${receiverPhone}/Contact/${myPhone}/Chats/${timestamp}`), messageData);
}

// Listen for messages
function listenForMessages(friend) {
  const chatRef = ref(db, `Accounts/${myPhone}/Contact/${friend}/Chats/`);
  messages.innerHTML = "";
  
  onValue(chatRef, (snapshot) => {
    messages.innerHTML = "";
    
    if (!snapshot.exists()) {
      messages.innerHTML = "<p style='color:gray;'>No messages yet.</p>";
      return;
    }
    
    // Convert messages to array and sort by timestamp
    const messagesArray = [];
    snapshot.forEach(child => {
      messagesArray.push({
        key: child.key,
        ...child.val()
      });
    });
    
    // Sort messages by timestamp
    messagesArray.sort((a, b) => parseInt(a.key) - parseInt(b.key));
    
    // Track current day for date headers
    let currentDay = null;
    
    // Display sorted messages with date headers
    messagesArray.forEach(msg => {
      const messageDate = new Date(parseInt(msg.key));
      const messageDay = messageDate.toDateString();
      
      // Check if this is a new day
      if (currentDay !== messageDay) {
        currentDay = messageDay;
        displayMessage(msg.text, msg.from, parseInt(msg.key), true);
      } else {
        displayMessage(msg.text, msg.from, parseInt(msg.key), false);
      }
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

// On page load
window.onload = () => {
  setupPresence();
  monitorFriendStatus(friendPhone);
  listenForMessages(friendPhone);
  friendNameFinder();
};

let profiles = document.createElement('div');
    profiles.className = 'profile';
    let profile = document.createElement('div');
    profile.className = 'profile';
    profile.style.margin = "0px 15px";
    profiles.appendChild(profile);
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
    name.innerHTML = 'Karan'
    subtitle.appendChild(name);
    let t_msg = document.createElement('p');
    t_msg.className = 't_msg';
    t_msg.innerHTML = 'hii'
    subtitle.appendChild(t_msg);
    let l_seen = document.createElement('p');
    l_seen.className = 'l_seen';
    l_seen.innerHTML = '12:35AM'
    title.appendChild(l_seen);
    document.body.appendChild(profile);
    console.log(profile, dp);
    const create = document.querySelector('.new');
    create.addEventListener('click', () => {
      window.location = "new.html";
      console.log("hello");
    })
    // Import 
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
    import { getDatabase, get, ref, set, child, update, remove }
      from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
    const db = getDatabase();
    set(ref(db, "WhatsApp-clone/" + "mobile.value"), {

    })
      .then(() => {
        console.log("Data successfully store");
        alert("Form Submission Successful");
        window.location = "/new.html";
      })
      .catch((error) => {
        alert("Unsuccessful,error " + error)
      })

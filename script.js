// script.js
const answers = [
    "sir, Suraj la monitor kara to khup hushar ahe!!",
    "Dagdusheth halwai ganpati",
    "25 feb 2024",
    "dekha ek khwab"
  ];
  const options = [
    [
      "sir, Suraj la monitor kara to khup hushar ahe!!",
      "sir, Suraj khup trass deto",
      "suraj is my best friend"
    ],
    [
      "Kasaba peth ganpati",
      "Dagdusheth halwai ganpati",
      "lalbaugcha raja"
    ],
    [
      "9 july 2024",
      "25 feb 2024",
      "14 feb 2024"
    ],
    [
      "chal shaky shaky",
      "dekha ek khwab",
      "Ye ratein ye mousam"
    ]
  ];
  const wrongMessages = [
    "Hmm... Think back to the tiny classroom where it all began. What magical words did Chiuu say to the teacher?",
    "Close! But think of that temple... Lord Ganesha, gold-covered walls, and your hands holding his in the crowd.",
    "I said it a thousand times, but when did you said it for him for the first time? 🩷",
    "This song plays in your soul... from dreams to destiny. Just hum it — the answer will come. 🎶"
  ];
  
  let currentMission = 1;
  const progressMap = document.getElementById("progressMap");
  const feedback = document.getElementById("feedback");
  
  const bgMusic = document.getElementById("bg-music");
  let isBgMusicPlaying = true;
  
  const khwabMusic = document.getElementById("khwab-music");
  
  function renderMission(missionNum) {
    const container = document.getElementById(`mission${missionNum}`);
    container.innerHTML = `
      <h2>Mission ${missionNum}: ${getTitle(missionNum)}</h2>
      <p>${getPrompt(missionNum)}</p>
      <div class="options" id="options${missionNum}"></div>
      <button class="btn" onclick="checkAnswer(${missionNum})">Submit</button>
      <div class="message" id="message${missionNum}"></div>
    `;
    const optionsContainer = document.getElementById(`options${missionNum}`);
    options[missionNum - 1].forEach((opt, idx) => {
      const div = document.createElement("div");
      div.className = "option-bubble";
      div.innerHTML = `<span class="emoji">🌸</span> ${opt}`;
      div.setAttribute("data-value", opt);
      div.onclick = () => selectOption(missionNum, idx);
      optionsContainer.appendChild(div);
    });
  }
  
  function getTitle(n) {
    return [
      "The Monitor Mystery",
      "Pune Puzzle",
      "Love Code",
      "Song of Us 🎵"
    ][n - 1];
  }
  
  function getPrompt(n) {
    return [
      "What did Samiksha say to the teacher in 5th standard that made Suraj class monitor?",
      "Name the golden Ganesha temple you visited together in Pune?",
      "What date did she say 'I love you' for the first time?",
      "Which song is most meaningful to you both?"
    ][n - 1];
  }
  
  const selectedOptions = [null, null, null, null];
  
  function selectOption(mission, idx) {
    const container = document.getElementById("options" + mission);
    Array.from(container.children).forEach((child, i) => {
      child.classList.toggle("selected", i === idx);
    });
    selectedOptions[mission - 1] = idx;
    document.getElementById("message" + mission).innerText = "";

    // Music logic for mission 4
    if (mission === 4) {
      if (options[3][idx].toLowerCase() === "dekha ek khwab") {
        // Stop background music and play dekha ek khwab
        bgMusic.pause();
        khwabMusic.currentTime = 136;
        khwabMusic.play();
        isBgMusicPlaying = false;
      } else {
        // Stop dekha ek khwab and resume background music
        if (!khwabMusic.paused) {
          khwabMusic.pause();
          khwabMusic.currentTime = 0;
        }
        if (!isBgMusicPlaying) {
          bgMusic.play();
          isBgMusicPlaying = true;
        }
      }
    }
  }
  
  function checkAnswer(mission) {
    const idx = selectedOptions[mission - 1];
    if (idx === null) {
      document.getElementById("message" + mission).innerText = "Please select an option!";
      return;
    }
    const selected = options[mission - 1][idx].trim().toLowerCase();
    const correct = answers[mission - 1].trim().toLowerCase();
    if (selected === correct) {
      showFeedback();
      document.getElementById(`mission${mission}`).style.display = "none";
      currentMission++;
      if (currentMission <= 4) {
        setTimeout(() => showMission(currentMission), 600);
      } else {
        setTimeout(() => showFinal(), 600);
      }
    } else {
      document.getElementById("message" + mission).innerText = wrongMessages[mission - 1];
    }
  }
  
  function showFeedback() {
    feedback.style.opacity = 1;
    feedback.style.display = "block";
    setTimeout(() => {
      feedback.style.opacity = 0;
      setTimeout(() => feedback.style.display = "none", 500);
    }, 700);
  }
  
  function showFinal() {
    // Hide all mission sections
    for (let i = 1; i <= 4; i++) {
      document.getElementById(`mission${i}`).style.display = "none";
      document.getElementById(`mission${i}`).classList.remove("visible");
    }
    document.getElementById("congrats").style.display = "flex";
    document.getElementById("congrats").classList.add("visible");
    // Hide progress map
    progressMap.style.display = "none";
  }
  
  // Progress map node highlighting
  function updateProgressMap(mission) {
    for (let i = 1; i <= 4; i++) {
      const node = document.getElementById(`node${i}`);
      if (i < mission) {
        node.classList.add("active");
      } else {
        node.classList.remove("active");
      }
    }
  }
  
  // Override showMission to update progress map and hide other sections
  function showMission(mission) {
    // Hide all sections
    document.getElementById("welcome").style.display = "none";
    document.getElementById("congrats").style.display = "none";
    document.getElementById("finalReveal").style.display = "none";
    for (let i = 1; i <= 4; i++) {
      document.getElementById(`mission${i}`).style.display = "none";
      document.getElementById(`mission${i}`).classList.remove("visible");
    }
    // Show current mission
    const section = document.getElementById("mission" + mission);
    section.style.display = "flex";
    section.classList.add("visible");
    renderMission(mission);
    updateProgressMap(mission);
    progressMap.style.display = "flex";
  }
  
  document.getElementById("startBtn").onclick = function () {
    document.getElementById("welcome").style.display = "none";
    showMission(1);
    // Start background music from 1:01 (61 seconds) when journey starts
    bgMusic.currentTime = 61;
    bgMusic.play();
    isBgMusicPlaying = true;
  };
  
  // Unlock button logic
  const unlockBtn = document.getElementById("unlockBtn");
  if (unlockBtn) {
    unlockBtn.onclick = function () {
      const code = document.getElementById("secretCode").value.trim().toLowerCase();
      const message = document.getElementById("codeMessage");
      // Set your secret code here
      const secret = "I love you too";
      if (code === secret.toLowerCase()) {
        document.getElementById("congrats").style.display = "none";
        document.getElementById("finalReveal").style.display = "flex";
        document.getElementById("finalReveal").classList.add("visible");
        message.innerText = "";
        // Stop all music and play the video
        bgMusic.pause();
        khwabMusic.pause();
        khwabMusic.currentTime = 0;
        bgMusic.currentTime = 0;
        const finalVideo = document.querySelector("#finalReveal video");
        if (finalVideo) {
          finalVideo.currentTime = 0;
          finalVideo.play();
        }
      } else {
        message.innerText = "Incorrect code! Try again.";
      }
    };
  }
  
  // On load, hide all sections except welcome
  window.onload = function () {
    document.getElementById("welcome").style.display = "flex";
    document.getElementById("welcome").classList.add("visible");
    for (let i = 1; i <= 4; i++) {
      document.getElementById(`mission${i}`).style.display = "none";
      document.getElementById(`mission${i}`).classList.remove("visible");
    }
    document.getElementById("congrats").style.display = "none";
    document.getElementById("congrats").classList.remove("visible");
    document.getElementById("finalReveal").style.display = "none";
    document.getElementById("finalReveal").classList.remove("visible");
    updateProgressMap(1);
    progressMap.style.display = "flex";
    // Remove music start from here
  };
  
  // Add event listener to show message when final video ends
  window.addEventListener('DOMContentLoaded', function () {
    const finalVideo = document.querySelector('#finalReveal video');
    if (finalVideo) {
      finalVideo.addEventListener('ended', function () {
        let revealSection = document.getElementById('finalReveal');
        // Remove the video element
        finalVideo.parentNode.removeChild(finalVideo);
        // Remove any previous message
        let msg = document.getElementById('finalVideoEndMsg');
        if (!msg) {
          msg = document.createElement('div');
          msg.id = 'finalVideoEndMsg';
          msg.style.marginTop = '20px';
          msg.style.fontSize = '1.6em';
          msg.style.textAlign = 'center';
          msg.style.background = 'rgba(255, 105, 180, 0.12)';
          msg.style.padding = '32px 18px';
          msg.style.borderRadius = '18px';
          msg.style.color = '#ff69b4';
          msg.style.boxShadow = '0 4px 24px rgba(255, 105, 180, 0.18)';
          msg.innerHTML =
            '<strong>And Happiest Birthday to you my special one, Your birthday present is waiting for you in hands of your roommate,</strong><br>don\'t forget to call your Karbhari before opening the gift😁, Mission Completed you nailed it Agent Chiuu, over and out my love!!';
          revealSection.appendChild(msg);
        } else {
          msg.style.display = 'block';
        }
      });
    }
  });
  

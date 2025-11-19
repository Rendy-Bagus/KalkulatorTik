// ===================== THEME TOGGLE =====================
const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeBtn.textContent = "☀ Light Mode";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeBtn.textContent = "☀ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    themeBtn.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
});


// ===================== SUBNETTING CALCULATOR =====================
document.getElementById("calcBtn").addEventListener("click", () => {
  const ip = document.getElementById("ipInput").value;
  const mask = parseInt(document.getElementById("maskInput").value);
  const resultBox = document.getElementById("result");
  const stepsBox = document.getElementById("stepByStepContainer");
  const stepsList = document.getElementById("stepsList");

  if (!ip || isNaN(mask)) {
    resultBox.innerHTML = "<p class='error'>Isi IP dan subnet mask dulu!</p>";
    return;
  }

  try {
    const ipParts = ip.split(".").map(Number);
    if (ipParts.length !== 4) throw "IP salah";

    const hostBits = 32 - mask;
    const totalHosts = Math.pow(2, hostBits);
    const usableHosts = totalHosts - 2;

    const subnetMask = 0xffffffff << (32 - mask);
    const ipToInt =
      (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];

    const network = ipToInt & subnetMask;
    const broadcast = network | (~subnetMask >>> 0);

    const intToIp = (int) =>
      [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join(".");

    resultBox.innerHTML = `
      <div class="result-box">
        <p><b>Network ID:</b> ${intToIp(network)}</p>
        <p><b>Broadcast:</b> ${intToIp(broadcast)}</p>
        <p><b>Total Hosts:</b> ${totalHosts}</p>
        <p><b>Usable Hosts:</b> ${usableHosts}</p>
      </div>
    `;

    stepsList.innerHTML = `
      <li>Konversi IP ke biner & terapkan mask.</li>
      <li>Hitung Network ID & Broadcast.</li>
      <li>Hitung host: 2^(32 - mask).</li>
    `;
    stepsBox.style.display = "block";

  } catch (err) {
    resultBox.innerHTML = "<p class='error'>Format IP tidak valid!</p>";
  }
});

// Reset
document.getElementById("resetBtn").addEventListener("click", () => {
  document.getElementById("ipInput").value = "";
  document.getElementById("maskInput").value = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("stepByStepContainer").style.display = "none";
});


// ===================== QUIZ SYSTEM =====================

// Pertanyaan
const quizData = {
  easy: [
    { q: "Apa fungsi dari subnet mask?",
      options: ["Menentukan kelas IP", "Memisahkan network dan host", "Menghitung kecepatan jaringan", "Mendeteksi gateway"],
      answer: 1
    },
    { q: "IP kelas C dimulai dari?",
      options: ["1–126", "128–191", "192–223", "224–239"],
      answer: 2
    },
    { q: "Apa kepanjangan dari LAN?",
      options: ["Local Area Network", "Wide Area Network", "Metropolitan Area Network"],
      answer: 0
    },
    { q: "Apa subnet default kelas A?",
      options: ["192.1.1.0","224.9.1.1", "255.0.0.0"],
      answer: 2
    },
  ],
  medium: [
    { q: "Berapa subnet mask untuk /26?",
      options: ["255.255.255.0", "255.255.255.192", "255.255.255.224", "255.255.255.240"],
      answer: 1
    },
    { q: "Berapa host usable dari subnet /30?",
      options: ["0", "2", "4", "6"],
      answer: 1
    }
  ],
  hard: [
    { q: "CIDR /27 memiliki total berapa host?",
      options: ["16", "30", "32", "64"],
      answer: 2
    },
    { q: "Network ID dari 10.1.5.129/25 adalah?",
      options: ["10.1.5.0", "10.1.5.128", "10.1.5.192", "10.1.5.64"],
      answer: 1
    }
  ]
};

let quizLevel = "easy";
let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById("quizContainer");
const nextBtn = document.getElementById("nextQuizBtn");
const statsBox = document.getElementById("quizStats");

// Ganti level
document.getElementById("quizLevelSelect").addEventListener("change", (e) => {
  quizLevel = e.target.value;
});

// Mulai quiz
document.getElementById("startQuizBtn").addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  statsBox.innerHTML = "";
  showQuestion();
});

// Tampilkan pertanyaan
function showQuestion() {
  const data = quizData[quizLevel][currentQuestion];

  quizContainer.innerHTML = `
    <div class="quiz-box">
      <h2>${data.q}</h2>
      <div class="mcq-list">
        ${data.options
          .map((opt, i) => `<button class="mcq-btn" onclick="selectOption(${i})">${opt}</button>`)
          .join("")}
      </div>
    </div>
  `;

  nextBtn.style.display = "none";
}

// Cek jawaban
function selectOption(choice) {
  const correct = quizData[quizLevel][currentQuestion].answer;
  const all = document.querySelectorAll(".mcq-btn");

  all.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.classList.add("correct");
    if (i === choice && choice !== correct) btn.classList.add("wrong");
  });

  if (choice === correct) score++;

  nextBtn.style.display = "block";
}

// Next soal
nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion >= quizData[quizLevel].length) {
    endQuiz();
  } else {
    showQuestion();
  }
});

// Akhir quiz
function endQuiz() {
  quizContainer.innerHTML = "";
  nextBtn.style.display = "none";

  statsBox.innerHTML = `
    <div class="result-box">
      <h3>Quiz Selesai!</h3>
      <p>Score kamu: <b>${score}</b> dari <b>${quizData[quizLevel].length}</b></p>
    </div>
  `;
}


// ===================== AI MENTOR =====================
document.getElementById("mentorSendBtn").addEventListener("click", () => {
  const input = document.getElementById("mentorInput").value;
  const bubble = document.getElementById("mentorResponse");

  if (!input.trim()) return;

  bubble.textContent = "Mentor sedang memikirkan jawaban...";

  setTimeout(() => {
    bubble.textContent =
      "Maaf, AI Mentor ini belum sepenuhnya AI asli, tapi aku bisa bantu jawab materi dasar jaringan kok!";
  }, 800);
});

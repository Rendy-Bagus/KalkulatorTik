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
    {
      q: "Apa kepanjangan dari IP?",
      options: ["Internet Program", "Internet Protocol", "Internal Process", "Intranet Packet"],
      answer: 1
    },
    {
      q: "Berapa bit yang terdapat pada satu alamat IPv4?",
      options: ["16 bit", "32 bit", "64 bit", "128 bit"],
      answer: 1
    },
    {
      q: "Berapa banyak oktet pada alamat IPv4?",
      options: ["2 oktet", "4 oktet", "6 oktet", "8 oktet"],
      answer: 1
    },
    {
      q: "Contoh IP Address kelas A adalah?",
      options: ["10.0.0.1", "192.168.1.1", "172.16.0.1", "255.0.0.1"],
      answer: 0
    },
    {
      q: "Contoh IP Address kelas B adalah?",
      options: ["172.16.0.1", "10.0.0.1", "192.168.1.1", "255.255.0.1"],
      answer: 0
    },
    {
      q: "Berapa rentang IP kelas A?",
      options: ["1.0.0.0 – 126.255.255.255", "128.0.0.0 – 191.255.255.255", "192.168.0.0 – 192.168.255.255", "224.0.0.0 – 239.255.255.255"],
      answer: 0
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
    },
    {
      q: "Berapa jumlah host yang bisa digunakan pada subnet dengan prefix /24?",
      options: ["512 host", "256 host", "254 host", "128 host"],
      answer: 2
    },
    {
      q: "Jika subnet mask 255.255.255.0, berapa prefix-nya?",
      options: ["/24", "/25", "/23", "/26"],
      answer: 0
    },
    {
      q: "IP 192.168.10.1/24 memiliki network address apa?",
      options: ["192.168.10.0", "192.168.10.1", "192.168.10.255", "192.168.10.128"],
      answer: 0
    },
    {
      q: "IP 192.168.10.1/24 memiliki broadcast address apa?",
      options: ["192.168.10.1", "192.168.10.0", "192.168.10.128", "192.168.10.255"],
      answer: 3
    },
    {
      q: "Jika subnet mask 255.255.255.128, berapa prefix-nya?",
      options: ["/25", "/26", "/24", "/23"],
      answer: 0
    },
     {
      q: "Dengan subnet mask /25, berapa host yang bisa digunakan?",
      options: ["126 host", "128 host", "64 host", "254 host"],
      answer: 0
    },
    {
      q: "IP 192.168.1.130/25 berada di network berapa?",
      options: ["192.168.1.192/25", "192.168.1.0/25", "192.168.1.64/25", "192.168.1.128/25"],
      answer: 3
    },
    {
      q: "Berapa broadcast address dari 192.168.1.128/25?",
      options: ["192.168.1.254", "192.168.1.128", "192.168.1.255", "192.168.1.129"],
      answer: 2
    },


  ],
  hard: [
    { q: "CIDR /27 memiliki total berapa host?",
      options: ["16", "30", "32", "64"],
      answer: 2
    },
    { q: "Network ID dari 10.1.5.129/25 adalah?",
      options: ["10.1.5.0", "10.1.5.128", "10.1.5.192", "10.1.5.64"],
      answer: 1
    },
     {
      q: "Diketahui IP 192.168.10.33/27, network address-nya adalah …",
      options: ["192.168.10.32", "192.168.10.0", "192.168.10.64", "192.168.10.33"],
      answer: 0
    },
    {
      q: "Broadcast address dari 192.168.10.33/27 adalah …",
      options: ["192.168.10.63", "192.168.10.32", "192.168.10.95", "192.168.10.34"],
      answer: 0
    },
    {
      q: "Berapa host valid untuk subnet /27?",
      options: ["32", "30", "28", "29"],
      answer: 1
    },
    {
      q: "IP 192.168.5.77/26 berada di network …",
      options: ["192.168.5.64/26", "192.168.5.0/26", "192.168.5.128/26", "192.168.5.192/26"],
      answer: 0
    },
    {
      q: "Broadcast address dari 192.168.5.64/26 adalah …",
      options: ["192.168.5.126", "192.168.5.64", "192.168.5.255", "192.168.5.127"],
      answer: 3
    },
     {
      q: "IP 172.16.4.130/20 memiliki network address apa?",
      options: ["172.16.8.0", "172.16.4.0", "172.16.0.0", "172.16.15.0"],
      answer: 2
    },
    {
      q: "IP 172.16.4.130/20 memiliki broadcast address apa?",
      options: ["172.16.15.255", "172.16.4.255", "172.16.31.255", "172.16.0.255"],
      answer: 0
    },
    {
      q: "Jika prefix /30, berapa host valid maksimal?",
      options: ["2", "4", "1", "8"],
      answer: 0
    },


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

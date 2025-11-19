// ========== NAVBAR HAMBURGER ==========
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

hamburgerBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// ========== THEME MODE ==========
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeBtn.textContent =
    document.body.classList.contains("dark-mode")
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";
});

// ========== QUIZ PILIHAN GANDA ==========
const quizLevels = {
  easy: [
    { q: "Apa kepanjangan IP?", a: "Internet Protocol", opts: ["Internal Port", "Integrated Protocol", "Internet Port"] },
    { q: "Berapa bit IPv4?", a: "32 bit", opts: ["128 bit", "16 bit", "64 bit"] },
    { q: "Berapa oktet IPv4?", a: "4 oktet", opts: ["6 oktet", "3 oktet", "10 oktet"] }
  ],
  medium: [
    { q: "Host /24?", a: "254 host", opts: ["126 host", "2 host", "1022 host"] },
    { q: "Prefix dari 255.255.255.0?", a: "/24", opts: ["/16", "/20", "/25"] },
    { q: "Network 192.168.10.1/24?", a: "192.168.10.0", opts: ["192.168.10.128", "192.168.10.10", "192.168.10.255"] }
  ],
  hard: [
    { q: "Network 192.168.10.33/27?", a: "192.168.10.32", opts: ["192.168.10.0", "192.168.10.64", "192.168.10.16"] },
    { q: "Broadcast 192.168.10.33/27?", a: "192.168.10.63", opts: ["192.168.10.32", "192.168.10.47", "192.168.10.127"] },
    { q: "Host valid /27?", a: "30 host", opts: ["62 host", "14 host", "2 host"] }
  ]
};

let quizLevel = "easy";
let quizIndex = 0;
let score = 0;

const levelSelect = document.getElementById("quizLevelSelect");
const startBtn = document.getElementById("startQuizBtn");
const nextBtn = document.getElementById("nextQuizBtn");
const quizContainer = document.getElementById("quizContainer");
const quizStats = document.getElementById("quizStats");

startBtn.addEventListener("click", () => {
  quizLevel = levelSelect.value;
  quizIndex = 0;
  score = 0;
  nextBtn.style.display = "none";
  quizStats.innerHTML = `Skor: 0/${quizLevels[quizLevel].length}`;
  showQuiz();
});

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function showQuiz() {
  const data = quizLevels[quizLevel][quizIndex];
  const opts = shuffle([data.a, ...data.opts]);

  quizContainer.innerHTML = `
    <h3>Pertanyaan ${quizIndex + 1}</h3>
    <p>${data.q}</p>

    <div class="options">
      ${opts.map(o => `
        <label class="option">
          <input type="radio" name="quizOpt" value="${o}">
          ${o}
        </label>
      `).join("")}
    </div>

    <button id="checkBtn">Periksa</button>
    <div id="quizFeedback"></div>
  `;

  document.getElementById("checkBtn").onclick = () => {
    const selected = document.querySelector('input[name="quizOpt"]:checked');

    if (!selected) return;

    const feedback = document.getElementById("quizFeedback");

    if (selected.value === data.a) {
      feedback.innerHTML = "✅ Benar!";
      score++;
    } else {
      feedback.innerHTML = `❌ Salah! Jawaban: <b>${data.a}</b>`;
    }

    quizStats.innerHTML = `Skor: ${score}/${quizLevels[quizLevel].length}`;
    nextBtn.style.display = "block";
  };
}

nextBtn.addEventListener("click", () => {
  quizIndex++;
  if (quizIndex >= quizLevels[quizLevel].length) {
    quizContainer.innerHTML = `<h3>Quiz selesai!</h3><p>Skor akhir: ${score}/${quizLevels[quizLevel].length}</p>`;
    nextBtn.style.display = "none";
  } else {
    showQuiz();
  }
});

// ===== AI Mentor =====
document.getElementById("mentorSendBtn").addEventListener("click", () => {
  const input = document.getElementById("mentorInput").value.trim();
  const bubble = document.getElementById("mentorResponse");

  if (!input) return;

  bubble.innerHTML = "<em>Mikir sebentar…</em>";

  setTimeout(() => {
    bubble.innerHTML = "Pertanyaan bagus! Tapi fitur mentor tetap sama seperti sebelumnya 😊";
  }, 800);
});

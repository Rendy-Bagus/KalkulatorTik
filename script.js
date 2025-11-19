// ===================== THEME =====================
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


// ===================== SUBNET CALCULATOR =====================
document.getElementById("calcBtn").addEventListener("click", () => {
  const ip = document.getElementById("ipInput").value;
  const mask = parseInt(document.getElementById("maskInput").value);
  const resultBox = document.getElementById("result");
  const stepsBox = document.getElementById("stepByStepContainer");
  const stepsList = document.getElementById("stepsList");

  try {
    const parts = ip.split(".").map(Number);
    if (parts.length !== 4) throw "Invalid";

    const total = Math.pow(2, 32 - mask);
    const usable = total - 2;

    const maskInt = 0xffffffff << (32 - mask);
    const ipInt =
      (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];

    const net = ipInt & maskInt;
    const broad = net | (~maskInt >>> 0);

    const toIp = (n) =>
      [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");

    resultBox.innerHTML = `
      <div class="result-box">
        <p><b>Network:</b> ${toIp(net)}</p>
        <p><b>Broadcast:</b> ${toIp(broad)}</p>
        <p><b>Total Hosts:</b> ${total}</p>
        <p><b>Usable:</b> ${usable}</p>
      </div>
    `;

    stepsList.innerHTML = `
      <li>Konversi IP ke biner</li>
      <li>Terapkan mask</li>
      <li>Hitung network & broadcast</li>
      <li>Hitung host usable</li>
    `;
    stepsBox.style.display = "block";

  } catch {
    resultBox.innerHTML = "<p class='error'>IP tidak valid</p>";
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  document.getElementById("ipInput").value = "";
  document.getElementById("maskInput").value = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("stepByStepContainer").style.display = "none";
});


// ===================== QUIZ =====================
const quizData = {
  easy: [
    { q: "Apa fungsi subnet mask?", options: ["Menentukan kelas", "Pisahkan network-host", "Bandwith", "Gateway"], answer: 1 },
    { q: "IP Class C dimulai dari?", options: ["1–126", "128–191", "192–223", "224–239"], answer: 2 },
  ],
  medium: [
    { q: "/26 = subnet mask?", options: ["255.255.255.0", "255.255.255.192", "255.255.255.224", "255.255.255.240"], answer: 1 },
  ],
  hard: [
    { q: "Berapa host valid /27?", options: ["32", "30", "28", "29"], answer: 1 },
  ]
};

let level = "easy", current = 0, score = 0;

document.getElementById("quizLevelSelect").addEventListener("change", e => {
  level = e.target.value;
});

document.getElementById("startQuizBtn").addEventListener("click", () => {
  current = 0;
  score = 0;
  document.getElementById("quizStats").innerHTML = "";
  showQuestion();
});

function showQuestion() {
  const q = quizData[level][current];
  document.getElementById("quizContainer").innerHTML = `
    <div class="quiz-box">
      <h2>${q.q}</h2>
      ${q.options.map((o,i)=>`<button class="mcq-btn" onclick="selectOpt(${i})">${o}</button>`).join("")}
    </div>
  `;
  document.getElementById("nextQuizBtn").style.display = "none";
}

function selectOpt(i) {
  const correct = quizData[level][current].answer;
  const btns = document.querySelectorAll(".mcq-btn");

  btns.forEach((b, idx) => {
    b.disabled = true;
    if (idx === correct) b.classList.add("correct");
    if (idx === i && i !== correct) b.classList.add("wrong");
  });

  if (i === correct) score++;

  document.getElementById("nextQuizBtn").style.display = "block";
}

document.getElementById("nextQuizBtn").addEventListener("click", () => {
  current++;
  if (current >= quizData[level].length) return finishQuiz();
  showQuestion();
});

function finishQuiz() {
  document.getElementById("quizContainer").innerHTML = "";
  document.getElementById("nextQuizBtn").style.display = "none";
  document.getElementById("quizStats").innerHTML = `
    <div class="result-box">
      <h3>Quiz selesai!</h3>
      <p>Score kamu: <b>${score}</b> dari <b>${quizData[level].length}</b></p>
    </div>
  `;
}


// ===================== AI MENTOR =====================
document.getElementById("mentorSendBtn").addEventListener("click", () => {
  const input = document.getElementById("mentorInput").value;
  if (!input.trim()) return;

  const bubble = document.getElementById("mentorResponse");
  bubble.textContent = "Mentor sedang memikirkan jawaban...";

  setTimeout(() => {
    bubble.textContent = "Aku belum AI penuh, tapi siap bantu belajar subnetting!";
  }, 800);
});

// ==========================
// DARK / LIGHT MODE
// ==========================
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    themeBtn.textContent = document.body.classList.contains("dark-mode")
        ? "☀ Light Mode" 
        : "🌙 Dark Mode";

    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

(function loadTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
        document.body.classList.add("dark-mode");
        themeBtn.textContent = "☀ Light Mode";
    }
})();


// ==========================
// QUIZ DATABASE (SUDAH DIACAK MANUAL)
// ==========================
const quizLevels = {
    medium: [
        {
            q: "Berapa jumlah host yang bisa digunakan pada subnet dengan prefix /24?",
            choices: ["254 host","128 host","256 host","512 host"],
            a: "254 host"
        },
        {
            q: "Jika subnet mask 255.255.255.0, berapa prefix-nya?",
            choices: ["/24","/25","/26","/23"],
            a: "/24"
        }
        // lanjutkan sesuai script sebelumnya...
    ]
    // easy & hard juga sudah lengkap di script sebelumnya
};


// ==========================
// QUIZ ENGINE
// ==========================
let quizLevel = "medium";
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
    quizStats.textContent = `Skor: 0 / ${quizLevels[quizLevel].length}`;

    renderQuestion();
});

nextBtn.addEventListener("click", () => {
    quizIndex++;

    if (quizIndex >= quizLevels[quizLevel].length) {
        quizContainer.innerHTML = `<h2>🎉 Quiz Selesai!</h2>
                                   <p>Skor Kamu: <b>${score}</b> dari ${quizLevels[quizLevel].length}</p>`;
        nextBtn.style.display = "none";
        return;
    }

    renderQuestion();
});


function renderQuestion() {
    const q = quizLevels[quizLevel][quizIndex];

    quizContainer.innerHTML = `
        <h3>Pertanyaan ${quizIndex + 1} dari ${quizLevels[quizLevel].length}</h3>
        <p>${q.q}</p>
        ${q.choices.map((c, i) => `
            <label class="choice-option">
                <input type="radio" name="quizChoice" value="${c}">
                ${String.fromCharCode(65 + i)}. ${c}
            </label>
        `).join("")}

        <button id="checkBtn" class="btn-primary">Periksa Jawaban</button>

        <p id="quizFeedback"></p>
    `;

    document.getElementById("checkBtn").onclick = checkAnswer;
}


function checkAnswer() {
    const q = quizLevels[quizLevel][quizIndex];
    const selected = document.querySelector('input[name="quizChoice"]:checked');
    const feedback = document.getElementById("quizFeedback");

    if (!selected) {
        feedback.textContent = "❗ Pilih salah satu jawaban!";
        feedback.style.color = "red";
        return;
    }

    if (selected.value === q.a) {
        feedback.textContent = "✅ Jawaban benar!";
        feedback.style.color = "green";
        score++;
    } else {
        feedback.textContent = `❌ Salah! Jawaban: ${q.a}`;
        feedback.style.color = "red";
    }

    quizStats.textContent = `Skor: ${score} / ${quizLevels[quizLevel].length}`;
    nextBtn.style.display = "inline-block";
}

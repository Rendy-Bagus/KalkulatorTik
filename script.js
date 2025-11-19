// Quiz dengan levels & skor (Pilihan Ganda)
const quizLevels = {
  easy: [
    { q: "Apa kepanjangan dari IP?", a: "Internet Protocol", o: ["Internet Package", "Internal Process", "Internet Protocol", "Input Program"] },
    { q: "Berapa bit pada alamat IPv4?", a: "32 bit", o: ["8 bit", "16 bit", "32 bit", "64 bit"] },
    { q: "Berapa banyak oktet pada IPv4?", a: "4 oktet", o: ["2 oktet", "3 oktet", "4 oktet", "5 oktet"] },
    { q: "Contoh IP kelas A adalah?", a: "10.0.0.1", o: ["172.16.0.1", "192.168.1.1", "10.0.0.1", "224.0.0.1"] },
    { q: "Subnet mask default kelas C?", a: "255.255.255.0", o: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.128"] }
  ],
  medium: [
    { q: "Host pada subnet /24?", a: "254 host", o: ["256 host", "254 host", "128 host", "62 host"] },
    { q: "Prefix dari 255.255.255.0?", a: "/24", o: ["/16", "/24", "/25", "/26"] },
    { q: "Broadcast 192.168.10.1/24 adalah?", a: "192.168.10.255", o: ["192.168.10.128", "192.168.10.255", "192.168.10.0", "192.168.10.1"] },
    { q: "Prefix mask 255.255.255.128?", a: "/25", o: ["/23", "/24", "/25", "/26"] },
    { q: "Host valid subnet /25?", a: "126 host", o: ["64 host", "126 host", "254 host", "2 host"] }
  ],
  hard: [
    { q: "Network dari 192.168.10.33/27?", a: "192.168.10.32", o: ["192.168.10.0", "192.168.10.32", "192.168.10.64", "192.168.10.48"] },
    { q: "Broadcast 192.168.10.33/27?", a: "192.168.10.63", o: ["192.168.10.32", "192.168.10.48", "192.168.10.63", "192.168.10.255"] },
    { q: "Host valid subnet /27?", a: "30 host", o: ["2 host", "14 host", "30 host", "62 host"] },
    { q: "Network IP 192.168.5.77/26?", a: "192.168.5.64/26", o: ["192.168.5.0/26", "192.168.5.64/26", "192.168.5.128/26", "192.168.5.96/26"] },
    { q: "Prefix /30 memiliki host?", a: "2 host", o: ["1 host", "2 host", "4 host", "14 host"] }
  ]
};

let quizLevel = "easy";
let quizIndex = 0;
let score = 0;

const levelSelect = document.getElementById('quizLevelSelect');
const startBtn = document.getElementById('startQuizBtn');
const nextBtn = document.getElementById('nextQuizBtn');
const quizContainer = document.getElementById('quizContainer');
const quizStats = document.getElementById('quizStats');

startBtn.addEventListener('click', () => {
  quizLevel = levelSelect.value;
  quizIndex = 0;
  score = 0;
  nextBtn.style.display = 'none';
  quizStats.innerHTML = `Skor: 0 dari ${quizLevels[quizLevel].length}`;
  showQuiz();
});

nextBtn.addEventListener('click', () => {
  quizIndex++;
  if (quizIndex >= quizLevels[quizLevel].length) {
    quizContainer.innerHTML = `<p>Selesai level <b>${quizLevel}</b>! Skor kamu: ${score}/${quizLevels[quizLevel].length}</p>`;
    quizStats.innerHTML = `Skor: ${score} dari ${quizLevels[quizLevel].length}`;
    nextBtn.style.display = 'none';
  } else {
    showQuiz();
  }
});

function showQuiz() {
  const c = quizLevels[quizLevel][quizIndex];
  const options = c.o.map((o, i) => `
    <label>
      <input type="radio" name="opt" value="${o}">
      ${o}
    </label><br>
  `).join("");

  quizContainer.innerHTML = `
    <p><b>Pertanyaan ${quizIndex+1} dari ${quizLevels[quizLevel].length}</b></p>
    <p>${c.q}</p>
    ${options}
    <button id="checkBtn">Periksa</button>
    <div id="quizFeedback"></div>
  `;

  document.getElementById('checkBtn').onclick = () => {
    const selected = document.querySelector('input[name="opt"]:checked');
    const feedback = document.getElementById('quizFeedback');

    if (!selected) {
      feedback.innerHTML = "⚠ Pilih salah satu jawaban!";
      return;
    }

    if (selected.value === c.a) {
      feedback.innerHTML = "✅ Benar!";
      score++;
    } else {
      feedback.innerHTML = `❌ Salah! Jawaban benar: <b>${c.a}</b>`;
    }

    quizStats.innerHTML = `Skor: ${score} dari ${quizLevels[quizLevel].length}`;
    nextBtn.style.display = 'inline-block';
  };
}

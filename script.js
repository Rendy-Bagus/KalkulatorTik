// Smooth navigation
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Dark / Light mode toggle
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeBtn.textContent =
    document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Subnet Calculator
document.getElementById('calcBtn').addEventListener('click', () => {
  const ip = document.getElementById('ipInput').value.trim();
  const mask = parseInt(document.getElementById('maskInput').value, 10);
  const resultDiv = document.getElementById('result');

  if (!ip || isNaN(mask) || mask < 0 || mask > 32) {
    resultDiv.innerHTML = `<p style="color:red;">Masukkan IP & subnet mask valid!</p>`;
    return;
  }

  const octets = ip.split('.');
  if (octets.length !== 4 || octets.some(o => {
    const n = parseInt(o,10);
    return isNaN(n) || n < 0 || n > 255;
  })) {
    resultDiv.innerHTML = `<p style="color:red;">Format IP tidak valid!</p>`;
    return;
  }

  try {
    const ipNum = (octets[0]<<24) | (octets[1]<<16) | (octets[2]<<8) | octets[3];
    const maskBits = mask;
    const maskNum = maskBits === 0 ? 0 : (0xFFFFFFFF << (32 - maskBits)) >>> 0;
    const netAddrNum = ipNum & maskNum;
    const broadcastNum = netAddrNum | (~maskNum >>> 0);

    const net = [
      (netAddrNum>>>24)&255,
      (netAddrNum>>>16)&255,
      (netAddrNum>>>8)&255,
      netAddrNum&255
    ].join('.');
    const broad = [
      (broadcastNum>>>24)&255,
      (broadcastNum>>>16)&255,
      (broadcastNum>>>8)&255,
      broadcastNum&255
    ].join('.');

    const totalHosts = maskBits >= 31 ? (maskBits === 31 ? 2 : 1) : (Math.pow(2, 32 - maskBits) - 2);

    resultDiv.innerHTML = `
      <div class="result-box">
        <h3>Hasil Perhitungan</h3>
        <p><b>Network Address:</b> ${net}</p>
        <p><b>Broadcast Address:</b> ${broad}</p>
        <p><b>Jumlah Host:</b> ${totalHosts.toLocaleString()}</p>
      </div>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">Terjadi kesalahan dalam perhitungan!</p>`;
  }
});

// Quiz Interaktif
const quizData = [
  { q: "Berapa bit untuk subnet mask /24?", a: "255.255.255.0" },
  { q: "Berapa jumlah host pada /30?", a: "2" },
  { q: "Subnet mask /16 artinya berapa bit network?", a: "16" },
];
let quizIndex = 0;

function showQuiz() {
  const container = document.getElementById('quizContainer');
  const q = quizData[quizIndex];
  container.innerHTML = `
    <div class="quiz-box">
      <p><b>${q.q}</b></p>
      <input type="text" id="quizAnswer" placeholder="Jawaban kamu...">
      <button id="checkBtn">Periksa</button>
      <div id="quizResult"></div>
    </div>
  `;

  document.getElementById('checkBtn').onclick = () => {
    const ans = document.getElementById('quizAnswer').value.trim();
    const result = document.getElementById('quizResult');
    if (ans.toLowerCase() === q.a.toLowerCase()) {
      result.innerHTML = "✅ Benar!";
    } else {
      result.innerHTML = `❌ Salah! Jawaban: <b>${q.a}</b>`;
    }
  };
}

function nextQuiz() {
  quizIndex = (quizIndex + 1) % quizData.length;
  showQuiz();
}

document.getElementById('nextQuizBtn').addEventListener('click', nextQuiz);

// AI Mentor Simulator
function askMentor() {
  const input = document.getElementById('mentorInput').value.trim();
  const bubble = document.getElementById('mentorResponse');
  if (!input) return;

  bubble.innerHTML = `<em>...</em>`;
  setTimeout(() => {
    let response;
    const lower = input.toLowerCase();
    if (lower.includes("subnet")) response = "Subnetting membagi jaringan jadi lebih kecil biar efisien.";
    else if (lower.includes("ip")) response = "IP Address itu alamat unik untuk tiap perangkat di jaringan.";
    else if (lower.includes("mask")) response = "Subnet mask menentukan bagian network dan host dari IP.";
    else if (lower.includes("halo")) response = "Halo juga! Siap bantu kamu belajar TKJ 🚀";
    else response = "Hmm... coba pertanyaan lain tentang jaringan atau subnetting ya.";
    bubble.textContent = response;
  }, 900);
}

document.getElementById('mentorSendBtn').addEventListener('click', askMentor);

// Initialize quiz
showQuiz();

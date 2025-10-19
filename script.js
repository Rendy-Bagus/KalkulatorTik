// Theme toggle
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeBtn.textContent =
    document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Subnet Calculator + Langkah-Langkah
document.getElementById('calcBtn').addEventListener('click', () => {
  const ip = document.getElementById('ipInput').value.trim();
  const mask = parseInt(document.getElementById('maskInput').value, 10);
  const resultDiv = document.getElementById('result');
  const stepsContainer = document.getElementById('stepByStepContainer');
  const stepsList = document.getElementById('stepsList');
  stepsList.innerHTML = '';
  stepsContainer.style.display = 'none';

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

  const ipNum = (octets[0]<<24) | (octets[1]<<16) | (octets[2]<<8) | octets[3];
  const maskBits = mask;
  const maskNum = maskBits === 0 ? 0 : (0xFFFFFFFF << (32 - maskBits)) >>> 0;
  const netAddrNum = ipNum & maskNum;
  const broadAddrNum = netAddrNum | (~maskNum >>> 0);

  const net = [
    (netAddrNum>>>24)&255,
    (netAddrNum>>>16)&255,
    (netAddrNum>>>8)&255,
    netAddrNum&255
  ].join('.');
  const broad = [
    (broadAddrNum>>>24)&255,
    (broadAddrNum>>>16)&255,
    (broadAddrNum>>>8)&255,
    broadAddrNum&255
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

  stepsContainer.style.display = 'block';
  stepsList.innerHTML = `
    <li>Alamat IP dalam decimal: ${ip}</li>
    <li>Alamat IP dalam biner: ${octets.map(o => ("00000000"+parseInt(o,10).toString(2)).slice(-8)).join('.')}</li>
    <li>Prefix / mask: /${maskBits}</li>
    <li>Mask dalam biner: ${("00000000000000000000000000000000" + maskNum.toString(2)).slice(-32).match(/.{8}/g).join('.')}</li>
    <li>Network address (IP AND mask): ${net}</li>
    <li>Broadcast address (network OR ~mask): ${broad}</li>
    <li>Jumlah host valid dalam subnet: ${totalHosts.toLocaleString()}</li>
  `;
});

document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('ipInput').value = '';
  document.getElementById('maskInput').value = '';
  document.getElementById('result').innerHTML = '';
  document.getElementById('stepByStepContainer').style.display = 'none';
});

// Quiz Interaktif dengan Skor
const quizData = [
  { q: "Berapa bit untuk subnet mask /24?", a: "24" },
  { q: "Berapa jumlah host pada /30?", a: "2" },
  { q: "Subnet mask /16 artinya berapa bit network?", a: "16" },
];
let quizIndex = 0;
let score = 0;

function showQuiz() {
  const container = document.getElementById('quizContainer');
  const current = quizData[quizIndex];
  container.innerHTML = `
    <div class="quiz-box">
      <p><b>Pertanyaan:</b> ${current.q}</p>
      <input type="text" id="quizAnswer" placeholder="Jawaban kamu...">
      <button id="checkBtn">Periksa</button>
      <div id="quizFeedback"></div>
    </div>
  `;
  document.getElementById('checkBtn').onclick = () => {
    const ans = document.getElementById('quizAnswer').value.trim();
    const feedback = document.getElementById('quizFeedback');
    if (ans === current.a) {
      feedback.innerHTML = "✅ Benar!";
      score++;
    } else {
      feedback.innerHTML = `❌ Salah! Jawaban yang benar: <b>${current.a}</b>`;
    }
    showStats();
  };
}

function showStats() {
  const statsDiv = document.getElementById('quizStats');
  statsDiv.innerHTML = `Skor kamu: ${score} dari ${quizData.length}`;
}

document.getElementById('nextQuizBtn').addEventListener('click', () => {
  quizIndex = (quizIndex + 1) % quizData.length;
  showQuiz();
});

showQuiz();

// AI Mentor (basic)
document.getElementById('mentorSendBtn').addEventListener('click', () => {
  const input = document.getElementById('mentorInput').value.trim().toLowerCase();
  const bubble = document.getElementById('mentorResponse');
  if (!input) return;
  bubble.innerHTML = `<em>Mikir sebentar…</em>`;
  setTimeout(() => {
    let response = "";
    if (input.includes("subnet mask")) {
      response = "Subnet mask adalah seperti …"; // Anda bisa kembangkan sendiri
    } else if (input.includes("ip address")) {
      response = "IP Address adalah seperti …"; // Anda bisa kembangkan sendiri
    } else {
      response = "Itu pertanyaan bagus! Coba tanyakan lebih spesifik tentang subnetting, IP, atau mask.";
    }
    bubble.textContent = response;
  }, 800);
});

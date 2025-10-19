// Theme toggle
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeBtn.textContent =
    document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Calculator + Langkah-Langkah
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

// Quiz dengan levels & skor
const quizLevels = {
  easy: [
    { q: "Apa kepanjangan dari IP?", a: "Internet Protocol" },
    { q: "Berapa bit yang terdapat pada satu alamat IPv4?", a: "32 bit" },
    { q: "Berapa banyak oktet pada alamat IPv4?", a: "4 oktet" },
    { q: "Contoh IP Address kelas A adalah?", a: "10.0.0.1" },
    { q: "Contoh IP Address kelas B adalah?", a: "172.16.0.1" },
    { q: "Contoh IP Address kelas C adalah?", a: "192.168.1.1" },
    { q: "Berapa rentang IP kelas A?", a: "1.0.0.0 – 126.255.255.255" },
    { q: "Berapa subnet mask default untuk kelas B?", a: "255.255.0.0" },
    { q: "IP 127.0.0.1 biasa digunakan untuk apa?", a: "Loopback atau localhost" },
    { q: "Berapa subnet mask default untuk kelas C?", a: "255.255.255.0" }
  ],
  medium: [
    { q: "Berapa jumlah host yang bisa digunakan pada subnet dengan prefix /24?", a: "254 host" },
    { q: "Jika subnet mask 255.255.255.0, berapa prefix-nya?", a: "/24" },
    { q: "IP 192.168.10.1/24 memiliki network address apa?", a: "192.168.10.0" },
    { q: "IP 192.168.10.1/24 memiliki broadcast address apa?", a: "192.168.10.255" },
    { q: "Jika subnet mask 255.255.255.128, berapa prefix-nya?", a: "/25" },
    { q: "Dengan subnet mask /25, berapa host yang bisa digunakan?", a: "126 host" },
    { q: "IP 192.168.1.130/25 berada di network berapa?", a: "192.168.1.128/25" },
    { q: "Berapa broadcast address dari 192.168.1.128/25?", a: "192.168.1.255" },
    { q: "Jika IP 10.0.0.1/8, berapa jumlah host yang bisa digunakan?", a: "16.777.214 host" },
    { q: "Subnet mask 255.255.255.192 memiliki prefix apa?", a: "/26" }
  ],
  hard: [
    { q: "Diketahui IP 192.168.10.33/27, berapa network address-nya?", a: "192.168.10.32" },
    { q: "Diketahui IP 192.168.10.33/27, berapa broadcast address-nya?", a: "192.168.10.63" },
    { q: "Berapa host valid pada subnet /27?", a: "30 host" },
    { q: "IP 192.168.5.77/26 berada pada network berapa?", a: "192.168.5.64/26" },
    { q: "Berapa broadcast address dari 192.168.5.64/26?", a: "192.168.5.127" },
    { q: "IP 172.16.4.130/20 memiliki network address apa?", a: "172.16.0.0" },
    { q: "IP 172.16.4.130/20 memiliki broadcast address apa?", a: "172.16.15.255" },
    { q: "Dengan prefix /30, berapa jumlah host valid?", a: "2 host" },
    { q: "Subnet mask dari prefix /30 adalah?", a: "255.255.255.252" },
    { q: "IP 10.10.8.1/21 memiliki network address apa?", a: "10.10.8.0" }
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
  const current = quizLevels[quizLevel][quizIndex];
  quizContainer.innerHTML = `
    <p><b>Pertanyaan ${quizIndex+1} dari ${quizLevels[quizLevel].length}</b></p>
    <p>${current.q}</p>
    <input type="text" id="quizAnswer" placeholder="Jawaban kamu...">
    <button id="checkBtn">Periksa</button>
    <div id="quizFeedback"></div>
  `;

  document.getElementById('checkBtn').onclick = () => {
    const ans = document.getElementById('quizAnswer').value.trim();
    const feedback = document.getElementById('quizFeedback');
    if (ans.toLowerCase() === current.a.toLowerCase()) {
      feedback.innerHTML = "✅ Benar!";
      score++;
    } else {
      feedback.innerHTML = `❌ Salah! Jawaban yang benar: <b>${current.a}</b>`;
    }
    quizStats.innerHTML = `Skor: ${score} dari ${quizLevels[quizLevel].length}`;
    nextBtn.style.display = 'inline-block';
  };
}

// AI Mentor sederhana
document.getElementById('mentorSendBtn').addEventListener('click', () => {
  const input = document.getElementById('mentorInput').value.trim().toLowerCase();
  const bubble = document.getElementById('mentorResponse');
  if (!input) return;
  bubble.innerHTML = `<em>Mikir sebentar…</em>`;
  setTimeout(() => {
    let response = "";
    if (input.includes("subnet mask")) {
      response = "Subnet mask adalah pembagi antara bagian jaringan (network) dan bagian perangkat (host). Contoh: 255.255.255.0 artinya 24 bit untuk jaringan dan 8 bit untuk host. Jadi tiap alamat IP dalam jaringan itu punya bagian milik jaringan yang sama, dan bagian host yang berbeda. Dengan memahami ini, kita bisa menentukan network address, broadcast, dan jumlah host valid dalam satu jaringan.";
    } else if (input.includes("ip address")) {
      response = "IP Address adalah alamat unik untuk tiap perangkat dalam jaringan komputer. Bayangkan rumah dalam komplek: tiap rumah punya nomor unik supaya paket surat bisa sampai. Begitu juga IP di jaringan. Misalnya 192.168.1.10 artinya perangkat itu punya alamat dalam jaringan 192.168.1.0/24. Penting juga memahami bahwa bagian awal bisa menunjukkan jaringan, dan bagian akhir menunjukkan perangkat.";
    } else if (input.includes("host")) {
      response = "Host dalam konteks jaringan ialah perangkat akhir (komputer, ponsel, printer) yang mendapat alamat IP dan bisa mengirim/terima data. Saat kita membuat subnet, kita sering menghitung ‘jumlah host valid’ yang bisa digunakan — karena dua alamat disediakan untuk network address dan broadcast sehingga host yang bisa dipakai lebih sedikit daripada total alamat.";
    } else {
      response = "Pertanyaan menarik! Bisa kamu spesifikasikan sedikit: misalnya ‘bagaimana cara menghitung jumlah host?’, atau ‘apa itu broadcast address?’. Aku akan bantu dengan penjelasan dan contoh mudah.";
    }
    bubble.textContent = response;
  }, 800);
});

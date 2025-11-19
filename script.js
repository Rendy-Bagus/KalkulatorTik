// Soal quiz dengan pilihan ganda (ABCD)
const quizLevels = {
  easy: [
    {
      q: "Apa kepanjangan dari IP?",
      choices: ["Internet Program", "Internet Protocol", "Internal Process", "Intranet Packet"],
      a: "Internet Protocol"
    },
    {
      q: "Berapa bit pada satu alamat IPv4?",
      choices: ["16 bit", "32 bit", "64 bit", "128 bit"],
      a: "32 bit"
    },
    {
      q: "Berapa banyak oktet pada alamat IPv4?",
      choices: ["2 oktet", "4 oktet", "6 oktet", "8 oktet"],
      a: "4 oktet"
    },
    {
      q: "Subnet mask default untuk kelas C adalah …",
      choices: ["255.255.0.0", "255.0.0.0", "255.255.255.0", "255.255.255.255"],
      a: "255.255.255.0"
    },
    {
      q: "Contoh IP Address kelas A adalah …",
      choices: ["192.168.1.1", "10.0.0.1", "172.16.0.1", "255.0.0.1"],
      a: "10.0.0.1"
    },
    {
      q: "IP 127.0.0.1 biasa digunakan untuk …",
      choices: ["Server DNS", "Default Gateway", "Loopback / localhost", "Broadcast"],
      a: "Loopback / localhost"
    },
    {
      q: "Prefix /24 sama dengan subnet mask …",
      choices: ["255.255.255.128", "255.255.0.0", "255.255.255.0", "255.0.0.0"],
      a: "255.255.255.0"
    },
    {
      q: "Jika subnet mask adalah /30, berapa host valid dalam satu subnet?",
      choices: ["1 host", "2 host", "4 host", "6 host"],
      a: "2 host"
    },
    {
      q: "Subnet mask 255.255.255.192 sama dengan prefix …",
      choices: ["/26", "/24", "/30", "/28"],
      a: "/26"
    },
    {
      q: "Tujuan subnetting antara lain adalah …",
      choices: ["Mengurangi jumlah IP", "Menghemat IP address", "Menaikkan IP publik", "Menghapus host"],
      a: "Menghemat IP address"
    }
  ],
  medium: [
    {
      q: "Jika IP 192.168.10.1/24, network address-nya adalah …",
      choices: ["192.168.10.0", "192.168.0.1", "192.168.10.255", "192.168.10.128"],
      a: "192.168.10.0"
    },
    {
      q: "Broadcast address untuk IP 192.168.10.1/24 adalah …",
      choices: ["192.168.10.255", "192.168.10.0", "192.168.10.128", "192.168.0.255"],
      a: "192.168.10.255"
    },
    {
      q: "Jika subnet mask 255.255.255.128, prefix-nya adalah …",
      choices: ["/25", "/26", "/24", "/23"],
      a: "/25"
    },
    {
      q: "Berapa host valid jika prefix /25?",
      choices: ["126", "128", "64", "254"],
      a: "126"
    },
    {
      q: "IP 192.168.1.130/25 berada di network mana?",
      choices: ["192.168.1.0/25", "192.168.1.128/25", "192.168.1.64/25", "192.168.1.192/25"],
      a: "192.168.1.128/25"
    },
    {
      q: "Broadcast address dari 192.168.1.128/25 adalah …",
      choices: ["192.168.1.255", "192.168.1.128", "192.168.1.254", "192.168.1.129"],
      a: "192.168.1.255"
    },
    {
      q: "Jumlah host di subnet 10.0.0.1/8 adalah …",
      choices: ["16.777.214", "16.777.216", "65.534", "254"],
      a: "16.777.214"
    },
    {
      q: "Subnet mask mana yang setara dengan /26?",
      choices: ["255.255.255.192", "255.255.255.224", "255.255.255.128", "255.255.255.240"],
      a: "255.255.255.192"
    },
    {
      q: "Jika prefix /26, berapa banyak subnet /26 dalam satu /24?",
      choices: ["4", "2", "8", "16"],
      a: "4"
    },
    {
      q: "Jika kamu punya 500 host, prefix minimal yang cukup adalah …",
      choices: ["/23", "/24", "/22", "/25"],
      a: "/23"
    }
  ],
  hard: [
    {
      q: "Diketahui IP 192.168.10.33/27, network address-nya adalah …",
      choices: ["192.168.10.32", "192.168.10.0", "192.168.10.64", "192.168.10.33"],
      a: "192.168.10.32"
    },
    {
      q: "Broadcast address dari 192.168.10.33/27 adalah …",
      choices: ["192.168.10.63", "192.168.10.32", "192.168.10.95", "192.168.10.34"],
      a: "192.168.10.63"
    },
    {
      q: "Berapa host valid untuk subnet /27?",
      choices: ["30", "32", "28", "29"],
      a: "30"
    },
    {
      q: "IP 192.168.5.77/26 berada di network …",
      choices: ["192.168.5.64/26", "192.168.5.0/26", "192.168.5.128/26", "192.168.5.192/26"],
      a: "192.168.5.64/26"
    },
    {
      q: "Broadcast address dari 192.168.5.64/26 adalah …",
      choices: ["192.168.5.127", "192.168.5.64", "192.168.5.255", "192.168.5.126"],
      a: "192.168.5.127"
    },
    {
      q: "Network address dari IP 172.16.4.130/20 adalah …",
      choices: ["172.16.0.0", "172.16.4.0", "172.16.8.0", "172.16.15.0"],
      a: "172.16.0.0"
    },
    {
      q: "Broadcast address dari 172.16.4.130/20 adalah …",
      choices: ["172.16.15.255", "172.16.4.255", "172.16.31.255", "172.16.0.255"],
      a: "172.16.15.255"
    },
    {
      q: "Jika prefix /30, berapa host valid maksimal?",
      choices: ["2", "4", "1", "8"],
      a: "2"
    },
    {
      q: "Subnet mask dari prefix /30 adalah …",
      choices: ["255.255.255.252", "255.255.255.248", "255.255.255.240", "255.255.255.224"],
      a: "255.255.255.252"
    },
    {
      q: "Network address dari IP 10.10.8.1/21 adalah …",
      choices: ["10.10.8.0", "10.10.0.0", "10.10.16.0", "10.10.8.1"],
      a: "10.10.8.0"
    }
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
  quizStats.innerHTML = `Skor: 0 / ${quizLevels[quizLevel].length}`;
  showQuiz();
});

nextBtn.addEventListener('click', () => {
  quizIndex++;
  if (quizIndex >= quizLevels[quizLevel].length) {
    quizContainer.innerHTML = `<p>Selesai level <b>${quizLevel}</b>! Skor kamu: ${score}/${quizLevels[quizLevel].length}</p>`;
    quizStats.innerHTML = `Skor: ${score} / ${quizLevels[quizLevel].length}`;
    nextBtn.style.display = 'none';
  } else {
    showQuiz();
  }
});

function showQuiz() {
  const current = quizLevels[quizLevel][quizIndex];
  quizContainer.innerHTML = `
    <p>${current.q}</p>
    ${current.choices.map((c, i) => `
      <div class="choice-container">
        <input type="radio" name="quizChoice" id="choice${i}" value="${c}">
        <label for="choice${i}">${String.fromCharCode(65 + i)}. ${c}</label>
      </div>
    `).join('')}
    <button id="checkBtn">Periksa Jawaban</button>
    <div id="quizFeedback"></div>
  `;

  document.getElementById('checkBtn').onclick = () => {
    const selected = document.querySelector('input[name="quizChoice"]:checked');
    const feedback = document.getElementById('quizFeedback');
    if (!selected) {
      feedback.textContent = "Pilih salah satu jawaban!";
      return;
    }
    if (selected.value === current.a) {
      feedback.textContent = "✅ Benar!";
      score++;
    } else {
      feedback.textContent = `❌ Salah! Jawaban benar: ${current.a}`;
    }
    quizStats.innerHTML = `Skor: ${score} / ${quizLevels[quizLevel].length}`;
    nextBtn.style.display = 'inline-block';
  };
}


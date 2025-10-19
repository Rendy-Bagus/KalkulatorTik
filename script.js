const btnCalc = document.getElementById("calc");
const btnMode = document.getElementById("toggleMode");
const grid = document.getElementById("grid");
const result = document.getElementById("result");

btnCalc.addEventListener("click", () => {
  const ip = document.getElementById("ip").value.trim();
  const cidr = parseInt(document.getElementById("cidr").value.trim());
  if (!ip || isNaN(cidr)) return alert("Masukkan IP dan CIDR yang valid!");

  const ipParts = ip.split(".").map(Number);
  const mask = (0xffffffff << (32 - cidr)) >>> 0;
  const net = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
  const network = net & mask;
  const broadcast = network | (~mask >>> 0);
  const totalHosts = Math.pow(2, 32 - cidr) - 2;

  const toIP = (num) =>
    [num >>> 24, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join(".");

  const data = [
    { label: "Network", value: toIP(network) },
    { label: "Broadcast", value: toIP(broadcast) },
    { label: "Netmask", value: toIP(mask) },
    { label: "First Host", value: toIP(network + 1) },
    { label: "Last Host", value: toIP(broadcast - 1) },
    { label: "Total Hosts", value: totalHosts },
  ];

  grid.innerHTML = data.map(
    (d) => `
    <div class="gitem">
      <div class="label">${d.label}</div>
      <div class="value">${d.value}</div>
    </div>`
  ).join("");

  result.style.display = "block";
  result.style.opacity = 0;
  setTimeout(() => result.style.opacity = 1, 50);
});

btnMode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  btnMode.textContent = document.body.classList.contains("dark") ? "☀" : "✪"
});

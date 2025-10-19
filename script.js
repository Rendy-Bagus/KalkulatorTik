// script.js

document.getElementById('calcForm').addEventListener('submit', function(event){
  event.preventDefault();
  calculateFromForm();
});

document.getElementById('resetBtn').addEventListener('click', function(){
  document.getElementById('ipInput').value = '';
  document.getElementById('prefixInput').value = '';
  document.getElementById('resultSection').style.display = 'none';
});

function calculateFromForm(){
  const ipInput = document.getElementById('ipInput').value.trim();
  const prefixInput = document.getElementById('prefixInput').value.trim();

  if (!ipInput || prefixInput === "") {
    alert("Isi dulu IP dan Prefix-nya!");
    return;
  }

  const prefix = parseInt(prefixInput, 10);
  if (isNaN(prefix) || prefix < 0 || prefix > 32) {
    alert("Prefix harus angka antara 0 hingga 32!");
    return;
  }

  const octets = ipInput.split('.');
  if (octets.length !== 4 || octets.some(o => {
    const n = parseInt(o, 10);
    return isNaN(n) || n < 0 || n > 255;
  })) {
    alert("Format IP salah! Contoh yang benar: 192.168.1.0");
    return;
  }

  try {
    const cidr = `${ipInput}/${prefix}`;
    const result = calculateSubnet(cidr);
    showResult(result);
  } catch (e) {
    alert("Terjadi kesalahan: " + e.message);
  }
}

function calculateSubnet(ipCidr) {
  const [addr, prefixStr] = ipCidr.split('/');
  const maskBits = parseInt(prefixStr, 10);
  if (isNaN(maskBits) || maskBits < 0 || maskBits > 32) {
    throw new Error('Prefix tidak valid');
  }

  const octets = addr.split('.');
  if (octets.length !== 4) {
    throw new Error('Alamat IP tidak valid');
  }
  const ipNum = octets.reduce((acc, oct) => (acc << 8) + parseInt(oct, 10), 0) >>> 0;

  const mask = (maskBits === 0) ? 0 : (0xFFFFFFFF << (32 - maskBits)) >>> 0;

  const network = ipNum & mask;
  const broadcast = network | (~mask >>> 0);

  let firstHost, lastHost, totalHosts;
  if (maskBits === 32) {
    firstHost = lastHost = network;
    totalHosts = 1;
  } else if (maskBits === 31) {
    firstHost = network;
    lastHost = broadcast;
    totalHosts = 2;
  } else {
    firstHost = network + 1;
    lastHost = broadcast - 1;
    totalHosts = (1 << (32 - maskBits)) - 2;
  }

  return {
    network: numToIp(network),
    broadcast: numToIp(broadcast),
    firstHost: numToIp(firstHost),
    lastHost: numToIp(lastHost),
    totalHosts,
    netmask: numToIp(mask),
    prefix: maskBits
  };
}

function numToIp(num) {
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255
  ].join('.');
}

function showResult(r) {
  const out = document.getElementById('result');
  out.innerHTML = `
    <p><b>Network:</b> ${r.network}</p>
    <p><b>Broadcast:</b> ${r.broadcast}</p>
    <p><b>Netmask:</b> ${r.netmask}</p>
    <p><b>First Host:</b> ${r.firstHost}</p>
    <p><b>Last Host:</b> ${r.lastHost}</p>
    <p><b>Total Hosts:</b> ${r.totalHosts.toLocaleString()}</p>
    <p><b>Prefix:</b> /${r.prefix}</p>
  `;
  document.getElementById('resultSection').style.display = 'block';
}

// Jika ingin membaca parameter URL (opsional)
(function(){
  const params = new URLSearchParams(window.location.search);
  const urlIp = params.get('ip');
  const urlPrefix = params.get('prefix');
  if (urlIp && urlPrefix) {
    document.getElementById('ipInput').value = urlIp;
    document.getElementById('prefixInput').value = urlPrefix;
    calculateFromForm();
  }
})();

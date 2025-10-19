document.getElementById('calcBtn').addEventListener('click', () => {
  const ipInput = document.getElementById('ipInput').value.trim();
  const prefixInput = document.getElementById('prefixInput').value.trim();

  if (!ipInput || prefixInput === "") {
    alert("Isi dulu IP dan Prefix-nya!");
    return;
  }

  try {
    const cidr = ${ipInput}/${prefixInput};
    const result = calculateSubnet(cidr);
    showResult(result);
  } catch (e) {
    alert("Format salah! Contoh: 192.168.1.0/24");
  }
});

function calculateSubnet(ipCidr) {
  const [addr, prefix] = ipCidr.split('/');
  const maskBits = parseInt(prefix);
  if (maskBits < 0 || maskBits > 32) throw new Error('Invalid prefix');

  const ipNum = addr.split('.').reduce((acc, oct) => (acc << 8) + parseInt(oct), 0);
  const mask = (0xffffffff << (32 - maskBits)) >>> 0;
  const network = ipNum & mask;
  const broadcast = network | (~mask >>> 0);
  const totalHosts = Math.max(0, (1 << (32 - maskBits)) - 2);
  const firstHost = network + 1;
  const lastHost = broadcast - 1;

  return {
    network: numToIp(network),
    broadcast: numToIp(broadcast),
    firstHost: numToIp(firstHost),
    lastHost: numToIp(lastHost),
    totalHosts,
    netmask: numToIp(mask)
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
    <p><b>Total Hosts:</b> ${r.totalHosts}</p>
  `;
}

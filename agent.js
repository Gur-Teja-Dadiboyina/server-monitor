const os = require("os");
const axios = require("axios");

const SERVER_ID = 1; // change per server
const API_URL = "http://localhost:3000/api/metrics";

function getCpu() {
  const cpus = os.cpus();
  let totalIdle = 0;
  let totalTick = 0;

  cpus.forEach(cpu => {
    for (let type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  });

  return 100 - (totalIdle / totalTick) * 100;
}

setInterval(async () => {
  const cpu = getCpu();
  const memory = (1 - os.freemem() / os.totalmem()) * 100;

  try {
    await axios.post(API_URL, {
      server_id: SERVER_ID,
      cpu_usage: cpu.toFixed(2),
      memory_usage: memory.toFixed(2)
    });

    console.log("Sent:", cpu.toFixed(2), memory.toFixed(2));
  } catch (err) {
    console.log("Error:", err.message);
  }
}, 5000);
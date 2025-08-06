const net = require("net");

const socketPath = "/tmp/unix-socket";

const client = net.createConnection({ path: socketPath }, (socket) => {
  client.write("Client");
});

client.on("end", () => {
  console.log("Disconnected from Unix socket server.");
});

const net = require("net");

const socketPath = "/tmp/unix-socket";

const server = net.createServer((socket) => {
  socket.on("data", (buffer) => {
    console.log(buffer.toString());
  });

  socket.on("end", () => {
    console.log("Client disconnected from Unix socket.");
    socket.end();
  });
});

server.listen(socketPath, () => {
  console.log(`Listen on ${socketPath}`);
});

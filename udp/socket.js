const dgram = require("dgram");

const server = dgram.createSocket("udp4");

server.on("message", (mgs, remoteInfo) => {
  console.log(
    `Message ${mgs.toString()} from ${remoteInfo.address} on port ${
      remoteInfo.port
    }`
  );
});

server.bind(8124);

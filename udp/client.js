const dgram = require("dgram");

const client = dgram.createSocket("udp4");

process.stdin.resume();

process.stdin.on("data", (data) => {
  client.send(data, 0, data.length, 8124, (error) => {
    if (error) {
      console.log("error:", error.message);
    } else {
      console.log("Success");
    }
  });
});

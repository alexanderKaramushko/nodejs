const http = require("http");
const fs = require("fs");
const mime = require("node-mime");
const async = require("async");

http
  .createServer((request, response) => {
    const filePath = request.url.replace("/", "");

    async.waterfall(
      [
        function getStat(callback) {
          return fs.stat(filePath, callback);
        },
        function sendResponse(stat, callback) {
          response.statusCode = 200;

          if (stat?.isFile()) {
            const ext = filePath.split(".")[1];

            response.setHeader("Content-Type", mime.lookUpType(ext));

            const stream = fs.createReadStream(filePath);

            stream.on("open", () => {
              stream.pipe(response);
            });

            stream.on("error", (error) => {
              console.log(error);
            });
          } else {
            return fs.readdir(filePath, callback);
          }
        },
        function sendDirs(dirs, callback) {
          response.setHeader("Content-Type", "text/html");
          response.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
            </head>
            <body>
              <ul>
                ${dirs.map((dir) => `<li>${dir}</dir>`)}
              </ul>
            </body>
            </html>  
          `);

          return callback();
        },
      ],
      function final(err) {
        if (err) {
          response.statusCode = 404;
          response.write(`Bad request 404: ${err.message}`);
          response.end();
        }

        response.end();
      }
    );
  })
  .listen(3000, "localhost");

const execFile = require("child_process").execFile;

execFile("./file.js", (error, stdout) => {
  console.log(error);
  if (!error) {
    console.log("stdout:", stdout);
  }
});

process.stdin.resume();

// Перехват stdin
process.stdin.on("data", function (chunk) {
  // Дубликат stdin -> stdout
  process.stdout.write("data:" + chunk);
});

const dns = require("dns");

dns.lookup("www.tbank.ru", (error, address, family) => {
  if (error) {
    console.log("error:", error.message);
  } else {
    console.log("Адрес:", address);
  }
});

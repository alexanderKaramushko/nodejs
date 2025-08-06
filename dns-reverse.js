const dns = require("dns");

dns.reverse("173.255.206.103", (error, domains) => {
  domains.forEach(console.log);
});

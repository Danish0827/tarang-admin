// server.js
// A production-ready Next.js server for Plesk
//Danish Shaikh
const { createServer } = require("http");
const next = require("next");

// dev=false because we're in production
const app = next({ dev: false });
const handle = app.getRequestHandler();

// Plesk sets PORT automatically in the environment.
// Fall back to 3000 if running locally.
const PORT = process.env.PORT || 5003;

app.prepare().then(() => {  
  createServer((req, res) => {
    handle(req, res);
  }).listen(PORT, (err) => {
    if (err) throw err;
    console.log(`✅ Next.js server running on port ${PORT}`);
  });
});
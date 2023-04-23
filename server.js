const http = require("http");
const app = require("./APP");
const port = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(port, () => console.log(`server listening to port ${port}`));
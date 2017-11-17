const server = require('./dist/server');
const HOST = '0.0.0.0';
const PORT = process.env.PORT || 5000;
server.listen(PORT, HOST, () => console.log("Node app is running at localhost:", PORT));

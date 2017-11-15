const server = require('./src/server');
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Node app is running at localhost:", PORT));

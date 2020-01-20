const http = require('http');
const reqHandler = require('./reqHandler');

const server = http.createServer(reqHandler);

server.listen(3000, () => {
  console.log('\x1b[34m\n\tServer started!\x1b[0m\n');
});

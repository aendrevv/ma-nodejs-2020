const http = require('http');
const reqHandler = require('./reqHandler');

const server = http.createServer(reqHandler);

// console.log(http.STATUS_CODES);

server.listen(3000, () => {
  console.log('\x1b[36m\tServer started!\x1b[0m');
});

const http = require('http');
// const retry = require('retry');
const endpoints = require('./endpoints');

const optionsPost = {
  method: 'POST',
  hostname: 'localhost',
  port: 3000,
  path: '/limit',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic QW5kcmlpOk9uZVR3bzM0',
  },
  body: JSON.stringify({ limit: 1488 }),
};

function httpRequestPromisified(options) {
  return new Promise((resolve, reject) => {
    const request = http.request(options, response => {
      // console.log(`STATUS: ${response.statusCode}`);
      // console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

      let rawData = '';

      response.on('data', chunk => (rawData += chunk));
      response.on('end', () => {
        response.data = JSON.parse(rawData);
        setTimeout(() => resolve(response), 500);
      });
    });

    request.on('error', err => reject(err));

    if (options.body) request.write(options.body);

    request.end();
  });
}

console.time('x');

function hrp(time) {
  setInterval(() => {
    httpRequestPromisified(optionsPost)
      .then(response => {
        console.log(response.data);
        return httpRequestPromisified(endpoints.newEndPoint);
      })
      .then(response => {
        console.log(response.data);
        return httpRequestPromisified(endpoints.metrics);
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => console.error(`ERROR!: ${err.message}`));
  }, time);
}

module.exports = { hrp };

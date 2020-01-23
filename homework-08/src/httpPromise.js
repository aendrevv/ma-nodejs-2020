/* eslint-disable prettier/prettier */
const http = require('http');
// const querystring = require('querystring');

const options = {
  'hostname': 'localhost',
  'port': 3000,
  'path': '/metrics',
  'method': 'GET',
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': 'Basic QW5kcmlpOk9uZVR3bzM0',
  },
};

function httpRequestPromisified(options) {
  return new Promise((resolve, reject) => {
    const request = http.request(options, response => {
      console.log(`STATUS: ${response.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

      let rawData = '';

      response.on('data', chunk => rawData += chunk);
      response.on('end', () => {
        response.data = rawData;
        resolve(response);
      });
    });

    request.on('error', err => reject(err));

    request.end();
  });
}

httpRequestPromisified(options)
  .then(response => console.log('RAM: ', JSON.parse(response.data)))
  .catch(err => console.error(':(', err));

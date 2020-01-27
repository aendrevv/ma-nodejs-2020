const http = require('http');

const options = {
  method: 'GET',
  hostname: 'localhost',
  port: 3000,
  path: '/metrics?filter=free',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic QW5kcmlpOk9uZVR3bzM0',
  },
};

const options_limit = {
  method: 'POST',
  hostname: 'localhost',
  port: 3000,
  path: '/limit',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic QW5kcmlpOk9uZVR3bzM0',
  },
  body: JSON.stringify({ limit: 6666 }),
};

const test_options = new URL('http://Andrii:OneTwo34@localhost:3000/metrics?filter=free');

function httpRequestPromisified(options) {
  return new Promise((resolve, reject) => {
    const request = http.request(options, response => {
      // console.log(`STATUS: ${response.statusCode}`);
      // console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

      let rawData = '';

      response.on('data', chunk => (rawData += chunk));
      response.on('end', () => {
        response.data = rawData;
        resolve(response);
      });
    });

    request.on('error', err => reject(err));

    if (options.body) request.write(options.body);

    request.end();
  });
}

httpRequestPromisified(options)
  .then(response => console.log('RAM:\n', JSON.parse(response.data)))
  .catch(err => console.error(`problem with request: ${err.message}`));

httpRequestPromisified(options_limit)
  .then(response => console.log('LIMIT MSG:\n', JSON.parse(response.data)))
  .catch(err => console.error(`problem with request: ${err.message}`));

httpRequestPromisified(test_options)
  .then(response => console.log('LIMIT MSG:\n', JSON.parse(response.data)))
  .catch(err => console.error(`problem with request: ${err.message}`));

const http = require('http');

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

const optionsGet = [
  new URL('http://Andrii:OneTwo34@localhost:3000/metrics'),
  new URL('http://Andrii:OneTwo34@localhost:3000/metrics?filter=total'),
  new URL('http://Andrii:OneTwo34@localhost:3000/metrics?filter=allocated'),
  new URL('http://Andrii:OneTwo34@localhost:3000/metrics?filter=free'),
  new URL('http://Andrii:OneTwo34@localhost:3000/new'),
];

function httpRequestPromisified(options) {
  return new Promise((resolve, reject) => {
    const request = http.request(options, response => {
      // console.log(`STATUS: ${response.statusCode}`);
      // console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

      let rawData = '';

      response.on('data', chunk => (rawData += chunk));
      response.on('end', () => {
        response.data = JSON.parse(rawData);
        resolve(response);
      });
    });

    request.on('error', err => reject(err));

    if (options.body) request.write(options.body);

    request.end();
  });
}

setInterval(() => {
  httpRequestPromisified(optionsPost)
    .then(response => {
      console.log(response.data);
      return httpRequestPromisified(optionsGet[0]);
    })
    .then(response => {
      console.log(response.data);
      return httpRequestPromisified(optionsGet[1]);
    })
    .then(response => {
      console.log(response.data);
      return httpRequestPromisified(optionsGet[2]);
    })
    .then(response => {
      console.log(response.data);
      return httpRequestPromisified(optionsGet[3]);
    })
    .then(response => {
      console.log(response.data);
      return httpRequestPromisified(optionsGet[4]);
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(err => console.error(`ERROR!: ${err.message}`));
}, 7000);

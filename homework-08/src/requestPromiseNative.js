//some code
const request = require('request-promise');

const options_limit = {
  method: 'POST',
  url: 'http://localhost:3000/limit',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic QW5kcmlpOk9uZVR3bzM0',
  },
  body: {
    limit: 9999,
  },
  json: true,
};

const options_metrics = {
  method: 'GET',
  url: 'http://localhost:3000/metrics',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic QW5kcmlpOk9uZVR3bzM0',
  },
  json: true,
};

request(options_limit)
  .then(response => console.log('LIMIT:\n', response))
  .catch(err => console.error(':(', err));

request(options_metrics)
  .then(response => console.log('METRICS:\n', response))
  .catch(err => console.error(':(', err));

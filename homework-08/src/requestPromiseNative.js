const rp = require('request-promise');
const retry = require('retry');
const endpoints = require('./endpoints');

const optionsLimit = {
  method: 'POST',
  uri: endpoints.limit,
  body: {
    limit: 500,
  },
  json: true,
};

const optionsNew = {
  uri: endpoints.newEndPoint,
  json: true,
};

const optionsMetrics = {
  uri: endpoints.metrics,
  json: true,
};

function rpn(time) {
  setInterval(() => {
    const operation = retry.operation({
      retries: 7,
      factor: 2,
      minTimeout: 100,
    });

    operation.attempt(currentAttempt => {
      rp(optionsNew)
        .then(response => {
          console.log(`Current STATUS:\n ${response.message} on ${currentAttempt} attempt`);
          return rp(optionsLimit);
        })
        .then(response => {
          console.log('Current LIMIT:\n', response);
          return rp(optionsMetrics);
        })
        .then(response => console.log('Current METRICS\n', response))
        .catch(error => {
          if (operation.retry(error)) {
            console.error('An error with request to NEW:\n', error.message);
            return;
          }
        });
    });
  }, time);
}

module.exports = { rpn };

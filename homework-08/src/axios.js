const axios = require('axios').default;
const retry = require('retry');
const endpoints = require('./endpoints');

function axi(time) {
  setInterval(() => {
    const operation = retry.operation({
      retries: 7,
      factor: 2,
      minTimeout: 100,
      randomize: true,
    });

    operation.attempt(async currentAttempt => {
      try {
        const response1 = await axios.get(endpoints.newEndPoint);
        console.log(
          `Current STATUS:\n ${response1.status}, ${response1.statusText}, on ${currentAttempt} attempt`
        );
        const response2 = await axios.get(endpoints.metrics);
        console.log('Current METRICS:\n', response2.data);
        const response3 = await axios.post(endpoints.limit, { limit: 500 });
        console.log('Current LIMIT:\n', response3.data);
      } catch (error) {
        if (operation.retry(error)) {
          console.error('An error with request to NEWENDPOINT:\n', error.message);
          return;
        }
      }
    });
  }, time);
}

module.exports = { axi };

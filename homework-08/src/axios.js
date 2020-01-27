// some code
const axios = require('axios');

async function getMetrics() {
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:3000/metrics',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic QW5kcmlpOk9uZVR3bzM0',
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error('OOPS!', error);
  }
}

async function getLimit() {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:3000/limit',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic QW5kcmlpOk9uZVR3bzM0',
      },
      data: {
        limit: 9999,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error('OOPS!', error);
  }
}

getLimit();
getMetrics();
axios
  .get('http://Andrii:OneTwo34@localhost:3000/metrics?filter=free')
  .then(response => console.log(':)\n', response.data))
  .catch(err => console.error(':(\n', err))
  .finally(() => console.log(`That's all, folks :D`));

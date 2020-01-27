const { getMemory, isItValidNumber, updateLimit } = require('./funcs');

const setLimit = async (req, res) => {
  try {
    const {
      headers: { authorization: auth },
      body: { limit },
    } = req;

    if (auth !== 'Basic QW5kcmlpOk9uZVR3bzM0') {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `Unathorized!` }));
    }

    const numLimit = +limit;

    if (isItValidNumber(numLimit)) {
      updateLimit(numLimit);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: `Minimum free memory limit is successfully set to [${numLimit}] MB`,
        })
      );
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: `New value for minimum free memory limit ${limit} is not valid number`,
        })
      );
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Internal error occured` }));
  }
};

const getMetrics = async (req, res) => {
  try {
    const {
      headers: { authorization: auth },
      queryParams: { filter },
    } = req;

    if (auth !== 'Basic QW5kcmlpOk9uZVR3bzM0') {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `Unauthorised!` }));
    }
    if (!filter) {
      const ram = getMemory();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(ram));
    }
    switch (filter) {
      case 'total':
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            message: 'OK',
            total: `${getMemory().totalMem}`,
          })
        );
        break;

      case 'free':
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            message: 'OK',
            free: `${getMemory().freeMem}`,
          })
        );
        break;

      case 'allocated':
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            message: 'OK',
            allocated: `${getMemory().allocMem}`,
          })
        );
        break;

      default:
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Filter value is not valid' }));
        break;
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Internal error occured` }));
  }
};

const getRandomStatus = async (req, res) => {
  try {
    const {
      headers: { authorization: auth },
    } = req;

    if (auth !== 'Basic QW5kcmlpOk9uZVR3bzM0') {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `Unathorized!` }));
    }

    const randStatusCodeAdd = Math.floor(Math.random() * 100);

    if (randStatusCodeAdd > 30) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end();
    } else {
      res.writeHead(400 + randStatusCodeAdd, { 'Content-Type': 'application/json' });
      res.end();
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Internal error occured` }));
  }
};

const notFound = res => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Not Found' }));
};

module.exports = { setLimit, getMetrics, getRandomStatus, notFound };

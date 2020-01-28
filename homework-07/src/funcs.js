const os = require('os');

let limit;

const updateLimit = x => {
  limit = x;
  return limit;
};

const getMemory = () => {
  const result = {
    message: 'OK!',
    totalMem: (os.totalmem() / 2 ** 20).toFixed(3),
    freeMem: (os.freemem() / 2 ** 20).toFixed(3),
    allocMem: ((os.totalmem() - os.freemem()) / 2 ** 20).toFixed(3),
  };

  if (result.freeMem < limit) {
    result.warningMessage = `!!! ATTENTION: Available memory is under the defined limit ${limit} MB  !!!`;
  }

  return result;
};

const isItValidNumber = num => typeof num === 'number' && num > 0;

module.exports = { getMemory, isItValidNumber, updateLimit };

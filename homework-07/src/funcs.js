const os = require('os');

const getMemory = () => {
  const limit = 1000;

  const result = {
    message: 'OK!',
    totalMem: (os.totalmem() / 2 ** 20).toFixed(3),
    freeMem: (os.freemem() / 2 ** 20).toFixed(3),
    allocMem: ((os.totalmem() - os.freemem()) / 2 ** 20).toFixed(3),
  };

  if (result.freeMem < limit) {
    result.errorMessage = `!!! ATTENTION: Available memory is under the defined limit !!!`;
  }

  return result;
};

const isItValidNumber = num =>
  typeof num === 'number' && num === num && num !== Infinity && num !== -Infinity && num > 0;

module.exports = { getMemory, isItValidNumber };

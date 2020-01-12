const os = require('os');

const attentionMessage = `!!! ATTENTION: Available memory is under the defined limit !!!`;

const showMemory = limit => {
  const response = {
    totalMem: (os.totalmem() / 2 ** 20).toFixed(3),
    freeMem: (os.freemem() / 2 ** 20).toFixed(3),
    allocMem: Number(response.totalMem) - Number(response.freeMem),
  };

  if (response.freeMem < limit) {
    response.errMessage = attentionMessage;
  }

  return response;
};

// setInterval(() => showMemory(), RATE);

module.exports = { showMemory };

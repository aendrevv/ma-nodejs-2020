const { showMemory } = require('./ram');

const getLimit = async (req, res) => {
  const { queryParams } = req;
  const { limit } = queryParams;

  res.statusCode = 200;
  res.end(JSON.stringify(showMemory(Number(limit))));
};

const getMetrics = async (req, res) => {
  const { queryParams } = req;
  const { limit } = queryParams;

  console.log('asdfgh');

  res.statusCode = 200;
  return res.end(JSON.stringify(showMemory(Number(limit))));
};
// console.log('RAM:', ram());

module.exports = { getLimit, getMetrics };

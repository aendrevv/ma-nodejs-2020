const { setLimit, getMetrics, getRandomStatus, notFound } = require('./controller');

const router = (req, res) => {
  const { url, method } = req;

  switch (url.pathname) {
    case '/limit':
      method === 'POST' ? setLimit(req, res) : notFound(res);
      break;
    case '/metrics':
      method === 'GET' ? getMetrics(req, res) : notFound(res);
      break;
    case '/new':
      getRandomStatus(req, res);
      break;
    default:
      notFound(res);
      break;
  }
};

module.exports = router;

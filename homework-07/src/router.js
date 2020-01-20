const { getLimit, getMetrics, notFound } = require('./controller');

const router = (req, res) => {
  const { url, method } = req;

  switch (url.pathname) {
    case '/limit':
      method === 'POST' ? getLimit(req, res) : notFound(res);
      break;
    case '/metrics':
      method === 'GET' ? getMetrics(req, res) : notFound(res);
      break;
    default:
      notFound(res);
      break;
  }
};

module.exports = router;

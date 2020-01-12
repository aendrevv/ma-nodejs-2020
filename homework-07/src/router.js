const controller = require('./controller');

function notFound(res) {
  res.statusCode = 404;
  // res.setHeader('Content-Type: application/json');
  res.end();
}

const router = (req, res) => {
  const { url, method } = req;

  switch (url.pathname) {
    case '/limit':
      if (method === 'POST') controller.getLimit(req, res);
      break;

    case '/metrics':
      if (method === 'GET') controller.getMetrics(req, res);
      break;

    default:
      notFound(res);
      break;
  }
};

module.exports = router;

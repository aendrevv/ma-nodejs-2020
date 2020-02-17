const querystring = require('querystring');
const url = require('url');
const router = require('./router');

const reqHandler = async (request, response) => {
  try {
    const { url: uri } = request;
    const parsedUrl = url.parse(uri);
    const queryParams = querystring.decode(parsedUrl.query);

    // console.log(queryParams.filter);
    // console.log(uri);
    // console.log(parsedUrl);

    let body = [];

    request
      .on('error', err => console.error(err))
      .on('data', chunk => body.push(chunk))
      .on('end', () => {
        body = Buffer.concat(body).toString();
        if (body.length) {
          try {
            body = JSON.parse(body);
          } catch (err) {
            console.error('Not valid JSON!', err);
          }
        }
        router(
          {
            ...request,
            url: parsedUrl,
            body,
            queryParams,
          },
          response
        );
      });
  } catch (err) {
    console.error('\tOOPS!\n', err);
  }
};

module.exports = reqHandler;

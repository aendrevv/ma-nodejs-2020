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

        router(
          {
            ...request,
            body: body ? JSON.parse(body) : {},
            url: parsedUrl,
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

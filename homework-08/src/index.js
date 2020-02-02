let cli = require('vorpal')();

const { hrp } = require('./httpPromise');
const { rpn } = require('./requestPromiseNative');
const { axi } = require('./axios');

console.log(
  `Hello, my friend!\nThis is\x1b[36m RAM monitoring CLI tool!\x1b[0m\nPlease, TYPE some of these:\n\x1b[33m< http >\x1b[0m\n\x1b[34m< rpn >\x1b[0m\n\x1b[35m< axios >\x1b[0m\nand press ENTER :)`
);

cli.command('http', 'Outputs "http Promises"').action(() => {
  console.log('http-request client starts:\n');
  hrp(10000);
});

cli.command('rpn', 'Outputs "request promise native"').action(() => {
  console.log('RPN client starts:\n');
  rpn(10000);
});

cli.command('axios', 'Outputs "axios"').action(() => {
  console.log('axios client starts:\n');
  axi(10000);
});

cli.delimiter('$').show();

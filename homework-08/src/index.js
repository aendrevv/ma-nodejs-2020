let cli = require('vorpal')();

const { hrp } = require('./httpPromise');
const { rpn } = require('./requestPromiseNative');
const { axi } = require('./axios');

console.clear();
console.log(
  `Hello, my friend!\nThis is\x1b[36m RAM monitoring CLI tool!\x1b[0m\nPlease, TYPE any command: 
  \x1b[33m http \x1b[0m or \x1b[34m rpn \x1b[0m or \x1b[35m axios \x1b[0m or \x1b[31m exit \x1b[0m \nthan press ENTER and\x1b[32m ENJOY ;)\x1b[0m\n`
);

cli.command('http', 'Outputs "http Promises"').action(() => {
  console.log('\nhttp-request client starts:\n');
  hrp(10000);
});

cli.command('rpn', 'Outputs "request promise native"').action(() => {
  console.log('\nrequest-promise-native client starts:\n');
  rpn(10000);
});

cli.command('axios', 'Outputs "axios"').action(() => {
  console.log('\naxios client starts:\n');
  axi(10000);
});

cli.delimiter('$').show();

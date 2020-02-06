const fs = require('fs');
const config = require('../config');

const { Transform, pipeline } = require('stream');

let chunksCounter = 0;
const speed = Math.min(1024, Math.max(128, config.speed));
const timeout = (64 * 1000) / speed;

const reportProgress = new Transform({
  transform(chunk, encoding, callback) {
    if (++chunksCounter % 16 === 0) process.stdout.write('. ');

    setTimeout(() => {
      this.push(chunk);
      callback();
    }, timeout);
  },
});

function streamJPEG(response) {
  console.log(`\nHere we go on ${speed} kBps!\n`);
  const readableStream = fs.createReadStream(config.filePath);
  pipeline(readableStream, reportProgress, response, err => {
    if (err) console.error('\nDownloading failed:\n', err.stack);
    console.log('\n\nDownloading succeeded!');
  });
}

module.exports = { streamJPEG };

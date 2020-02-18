const fs = require('fs');
const config = require('../config');

const { Transform, pipeline } = require('stream');
class transformStream extends Transform {
  constructor() {
    super();
    this.currentSize = 0;
  }

  _transform(chunk, encoding, callback) {
    const timeout = (1000 * chunk.length) / Math.max(config.speedMinimal, config.speedCustom);
    this.currentSize += chunk.length;
    if (this.currentSize >= 1024 * 1024) {
      process.stdout.write('. ');
      this.currentSize = 0;
    }
    setTimeout(() => {
      this.push(chunk);
      callback();
    }, timeout);
  }
}

function streamJPEG(response) {
  console.log(`\nStart on ${Math.max(config.speedMinimal, config.speedCustom) / 1024} kBps!\n`);

  const readableStream = fs.createReadStream(config.filePath);
  const speedController = new transformStream();

  readableStream.on('error', error => {
    console.error('Error in image reading !', error.stack);
    response.emit('error', new Error('Error in image reading !'));
  });
  speedController.on('error', error => {
    console.error('Error in image streaming !', error.stack);
    response.emit('error', new Error('Error in image streaming !'));
  });

  pipeline(readableStream, speedController, response, err => {
    if (err) {
      console.error('\nDownloading failed:\n', err.stack);
    } else console.log('\n\nDownloading succeeded!');
  });
}

module.exports = { streamJPEG };

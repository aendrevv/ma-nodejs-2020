const fsp = require('fs').promises;
const config = require('../config');

function sendJPEG(res) {
  fsp
    .readFile(config.filePath)
    .then(buffer => res.end(buffer))
    .catch(err => {
      console.error('Failed to send image buffer!', err.stack);
      res.emit('error', new Error('Failed to send image!'));
    });
}

function sizeJPEG() {
  fsp
    .stat(config.filePath)
    .then(res => console.log(res.size))
    .catch(err => console.error('Failed to send image buffer!', err.stack));
}

module.exports = {
  sendJPEG,
  sizeJPEG,
};
//hmm..

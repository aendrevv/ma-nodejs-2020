const os = require('os');

const RATE = process.env.RATE || 1000;
const LIMIT = process.env.LIMIT || 300;
const COLOR = process.env.COLOR || 'true';

let allocMemPrev = 0;

const showMemory = async () => {
  const totalMem = os.totalmem() / 2 ** 20;
  const freeMem = os.freemem() / 2 ** 20;
  const allocMem = totalMem - freeMem;
  const delta = allocMem - allocMemPrev;
  allocMemPrev = allocMem;

  let attentionMesage = `!!! ATTENTION: Available memory is under the defined limit !!!`;

  console.clear();

  console.log(`Total system memory:\t\t\t${totalMem.toFixed(3)} MB`);
  if (COLOR === 'true') {
    if (freeMem <= LIMIT) {
      console.log(`Free memory available:\x1b[31m%s\x1b[0m`, `\t\t\t${freeMem.toFixed(3)} MB`);
    } else {
      console.log(`Free memory available:\t\t\t${freeMem.toFixed(3)} MB`);
      attentionMesage = ` `;
    }
    console.log(`Current allocated memory:\t\t${allocMem.toFixed(3)} MB`);
    if (delta < 0) {
      console.log(
        `Delta for previous allocated memory:\x1b[31m%s\x1b[0m`,
        `\t${delta.toFixed(3)} MB`
      );
    } else {
      console.log(
        `Delta for previous allocated memory:\x1b[32m%s\x1b[0m`,
        `\t${delta.toFixed(3)} MB`
      );
    }
    console.log(`\x1b[31m%s\x1b[0m`, attentionMesage);
  } else {
    console.log(`Free memory available:`, `\t\t\t${freeMem.toFixed(3)} MB`);
    console.log(`Current allocated memory:\t\t${allocMem.toFixed(3)} MB`);
    console.log(`Delta for previous allocated memory:`, `\t${delta.toFixed(3)} MB`);
    if (freeMem <= LIMIT) {
      console.log(attentionMesage);
    }
  }
};

setInterval(() => showMemory(), RATE);

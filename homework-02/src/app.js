const { task1: altTask1, task2: altTask2, task3 } = require('./task');

async function boot() {
  console.log(altTask1.theSum);
  console.log(await task3.someFunction);
  altTask2.earth.printNameAndVolume();
}

boot();

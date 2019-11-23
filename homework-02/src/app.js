const { task1: altTask1, task2: altTask2, task3 } = require('./task');

async function boot() {
  console.log(altTask1.theSum);
  await task3.someFunction.then(res => console.log(res));
  altTask2.earth.printNameAndVolume();
}

boot();

/* eslint-disable prettier/prettier */

let number = 3;
let primeMax = 3;

function primeCheck(n) {
  for (let d = 2; d * d <= n; d++) {
    if (n % d == 0) return false;
  }
  return true;
}

function primeFinder() {
  if (primeCheck(++number)) {
    primeMax = number;
  }
}

setInterval(() => primeFinder(), 1);

setInterval(() => {
  console.log(`${Date.now()}: -- IN PROCESS -- Biggest prime number found: ${primeMax}`);
}, 1000);

// TEST:

// setTimeout(() => {
//   console.log('test 1000');
// }, 1000);

// setTimeout(() => {
//   console.log('test 10000');
// }, 10000);

// setTimeout(() => {
//   console.log('test 5000');
// }, 5000);

// setTimeout(() => {
//   console.log('test 15000');
// }, 15000);

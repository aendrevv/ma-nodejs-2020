/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
const my_number = -1;
let myNumber = 0;
let number = 3;

if (true) {
  let my_number = 1;
  myNumber = 2;
  number = 6;
}

function theSum(x, y, z) {
  return x + y + z;
}

module.exports.theSum = theSum(my_number, myNumber, number);

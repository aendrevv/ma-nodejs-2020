const { throwDice } = require('./myFunctions');

const start = Date.now();
let justAnotherSum = 0;

throwDice(700)
  .then(dice1 => {
    console.log(`Running time: ${Date.now() - start}; The sum is: ${dice1}`);
    justAnotherSum += dice1;
    return throwDice(1300);
  })
  .then(dice2 => {
    console.log(`Running time: ${Date.now() - start}; The sum is: ${dice2}`);
    justAnotherSum += dice2;
  })
  .then(() => {
    setTimeout(() => console.log(`Running time: ${Date.now() - start}; The sum is: ${justAnotherSum}`), 1000);
  })
  .catch(err => console.log(err));

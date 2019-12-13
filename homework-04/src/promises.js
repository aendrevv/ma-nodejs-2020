const { throwDice, getSumAfterOneSec } = require('./myFunctions');

const start = Date.now();

throwDice(700)
  .then(dice1 => {
    console.log(`Running time: ${Date.now() - start}; First dice is: ${dice1}`);
    throwDice(1300).then(dice2 => {
      console.log(`Running time: ${Date.now() - start}; Second dice is: ${dice2}`);
      getSumAfterOneSec(dice1, dice2).then(sum =>
        console.log(`Running time: ${Date.now() - start}; The sum is: ${sum}`)
      );
    });
  })
  .catch(err => console.log(err));

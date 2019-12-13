const { throwDice, getSumAfterOneSec } = require('./myFunctions');

async function throwTwoDices() {
  const start = Date.now();
  try {
    const dice1 = await throwDice(700);
    console.log(`Running time: ${Date.now() - start}; First dice is: ${dice1};`);
    const dice2 = await throwDice(1300);
    console.log(`Running time: ${Date.now() - start}; Second dice is: ${dice2};`);
    const sum = await getSumAfterOneSec(dice1, dice2);
    console.log(`Running time: ${Date.now() - start}; The sum is: ${sum};`);
  } catch (error) {
    console.log(error);
    return;
  }
}

throwTwoDices();

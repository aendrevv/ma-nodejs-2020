function throwDice(timeout) {
  const result = Math.floor(Math.random() * 1e10) % 7;
  return new Promise((resolve, reject) => {
    if (result === 0) reject(new Error('LOST DICE , KARL !'));
    setTimeout(() => resolve(result), timeout);
  });
}

async function throwTwoDices(timeout1, timeout2, timeout3) {
  const start = Date.now();
  try {
    let dice1 = await throwDice(timeout1);
    console.log(`Running time: ${Date.now() - start}; First dice is: ${dice1};`);
    let dice2 = await throwDice(timeout2);
    console.log(`Running time: ${Date.now() - start}; Second dice is: ${dice2};`);
    setTimeout(() => console.log(`Running time: ${Date.now() - start}; The sum is: ${dice1 + dice2}.`), timeout3);
  } catch (error) {
    console.log(error);
    return;
  }
}

throwTwoDices(700, 1300, 1000);

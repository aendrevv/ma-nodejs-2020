function throwDice(timeout) {
  const dice = Math.floor(Math.random() * 1e10) % 7;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (dice === 0) reject('LOST DICE!');

      resolve(dice);
    }, timeout);
  });
}

let dice1, dice2;
const start = Date.now();

throwDice(700)
  .then(result => {
    dice1 = result;
    console.log(`${Date.now() - start} -: 1 :- ${result}`);
  })
  .catch(err => console.log(err));

throwDice(2000)
  .then(result => {
    dice2 = result;
    console.log(`${Date.now() - start} -: 2 :- ${result}`);
  })
  .catch(err => console.log(err));

setTimeout(() => console.log(`${Date.now() - start} -:sum:- ${dice1 + dice2}`), 3000);

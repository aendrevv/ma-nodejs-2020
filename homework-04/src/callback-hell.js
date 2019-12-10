function throwDice(callback) {
  const data = Math.floor(Math.random() * 1e10) % 7;
  data === 0 ? callback(new Error(`LOST DICE , KARL !`)) : callback(null, data);
}

let start = Date.now();

setTimeout(() => {
  throwDice((errA, diceA) => {
    if (errA) throw errA;
    console.log(`1-st Dice: ${diceA} , time: ${Date.now() - start}`);

    setTimeout(() => {
      throwDice((errB, diceB) => {
        if (errB) throw errB;
        console.log(`2-nd Dice: ${diceB} , time: ${Date.now() - start}`);

        setTimeout(() => {
          console.log(`The Sum is: ${diceA + diceB} , time: ${Date.now() - start}`);
        }, 1000);
      });
    }, 1300);
  });
}, 700);

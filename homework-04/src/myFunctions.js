function throwDice(timeout) {
  const result = Math.floor(Math.random() * 1e3) % 7;
  return new Promise((resolve, reject) => {
    if (result === 0) reject(new Error('LOST DICE , KARL !'));
    setTimeout(() => resolve(result), timeout);
  });
}

function getSumAfterOneSec(one, two) {
  return new Promise(resolve => {
    setTimeout(() => resolve(two + one), 1e3);
  });
}

module.exports = { throwDice, getSumAfterOneSec };

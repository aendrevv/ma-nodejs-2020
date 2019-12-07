function callback(error, data) {
  if (error) {
    console.log(error);
    return;
  } else {
    return data;
  }
}

function throwDiceWithCallbacks(callback) {
  let dice = Math.floor(Math.random() * 1e10) % 7;

  if (dice === 0) {
    callback(new Error('LOST DICE !!!'));
    return process.kill(process.pid);
  } else {
    return callback(null, dice);
  }
}

let first, second;

const start = Date.now();

// setInterval(() => {
//   console.log(Date.now() - start);
// }, 100);

setTimeout(() => {
  first = throwDiceWithCallbacks(callback);
  console.log(`${Date.now() - start} -:-:- ${first}`);
}, 700);

setTimeout(() => {
  second = throwDiceWithCallbacks(callback);
  console.log(`${Date.now() - start} -:-:- ${second}`);
}, 2000);

setTimeout(() => {
  console.log(`${Date.now() - start} -:-:- ${first + second}`);
}, 3000);

// setTimeout(() => {
//   process.kill(process.pid);
// }, 5000);

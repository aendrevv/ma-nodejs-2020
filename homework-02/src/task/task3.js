function someFunction(timer, text) {
  return new Promise(res => setTimeout(() => res(text), timer));
}

// someFunction(1000, 'fuck off').then(res => console.log(res));

module.exports.someFunction = someFunction(1000, "some random text");

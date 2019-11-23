function someFunction(timer, text) {
  return new Promise(res => setTimeout(() => res(text), timer));
}

module.exports.someFunction = someFunction(1000, 'some random text');

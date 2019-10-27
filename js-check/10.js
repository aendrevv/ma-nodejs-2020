// 10*. Дано клас Storage, що є SDK для доступу до якогось сховища даних по текстовому ключу. 
// При цьому, кожен метод повертає Promise:

// list() повертає Promise, який зарезолвиться масивом ключів
// fetch(key) повертає Promise, який зарезолвиться даними
// store(key, data) повертає Promise
// destroy(key) повертає Promise

// storeList([{key, data}])
// destroyStartedWith(beginningOfKey)
// fetchInTimeOrFail(key, timeout)

/* eslint-disable linebreak-style */
/* eslint-disable no-console */

class Storage {
  constructor() {
    this.storage = { a: 10000, b: 1488, c: -1 };
  }

  list() {
    return new Promise(resolve => {
      resolve(Object.keys(this.storage));
    });
  }

  fetch(key) {
    return new Promise((resolve, reject) => {
      if (!this.storage[key]) reject();

      resolve(this.storage[key]);
    });
  }

  store(key, data) {
    return new Promise((resolve, reject) => {
      if (this.storage[key]) reject();

      this.storage[key] = data;
      resolve();
    });
  }

  destroy(key) {
    return new Promise((resolve, reject) => {
      if (!this.storage[key]) reject();

      resolve(delete this.storage[key]);
    });
  }

  fetchInTimeOrFail(key, timeout) {
    return new Promise((resolve, reject) => {
      const zeroPoint = new Date();
      const data = this.storage[key];
      
      if (new Date() - zeroPoint < timeout) reject(new Date() - zeroPoint);

      resolve(data);
    });
  }

  storeList(data) {
    return new Promise((resolve, reject) => {
      if (!data.length) reject('oops.');

      data.forEach(arg => {
        const key = Object.keys(arg)[0];
        this.storage[key] = arg[key];
      });
      resolve();
    });
  }

  destroyStartedWith(beginningOfKey) {
    return new Promise(resolve => {
      Object.keys(this.storage).forEach(arg => {
        if (arg.startsWith(beginningOfKey)) {
          delete this.storage[arg];
        }
      });
      resolve();
    });
  }
}

// let mySDK = new Storage();

// mySDK
//   .store(`d`, 123)
//   .then(() => console.log(`New key is added!`))
//   .catch(() => console.log(`Key already exists!`));

// mySDK.list().then(arg => console.log(arg));

// mySDK
//   .fetch(`b`)
//   .then(arg => console.log(arg))
//   .catch(() => console.log(`Key does't exist!`));

// mySDK
//   .destroy(`a`)
//   .then(() => console.log(`Key is deleted!`))
//   .catch(() => console.log(`Key does't exist!`));

// mySDK.list().then(arg => console.log(arg));

// mySDK
//   .storeList([{ x: 6 }, { xx: 66 }, { xxx: 666 }])
//   .then(() => console.log(`New key is added!`))
//   .catch(err => console.log(err));

// mySDK.list().then(arg => console.log(arg));

// mySDK
//   .destroyStartedWith('xx')
//   .then(() => console.log(`Keys are deleted!`));

// mySDK.list().then(arg => console.log(arg));

// mySDK
//   .fetchInTimeOrFail(`x`, 0)
//   .then(arg => console.log(arg))
//   .catch((err) => console.log(err));
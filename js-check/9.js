// 9.js
// Написати функцію, що огортає setTimeout() в Promise. При виклику вона приймає один параметр —
// кількість мілісекунд. Функція повертає Promise, що має перейти в стан resolved через задану кількість
// мілісекунд.

function someFunction(delay) {
  return new Promise(resolve => setTimeout(() => resolve(`SUCCESS!!`), delay));
}

someFunction(1000).then(res => console.log(res));

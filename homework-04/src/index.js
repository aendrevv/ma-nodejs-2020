// <!-- Написать синхронную функцию throwDice() возвращающую случайное целое число в диапазоне от 1 до 6 включительно.

// написать программу бросания двух игровых костей с получением результата с временными задержками:
// через 0.7с после старта вызвать throwDice() вывести результат
// через 2с после старта вызвать throwDice() вывести результат
// через 3c после старта вывести сумму выпавших кубиков

// Повышенный уровень сложности:
// расширить throwDice() вероятностью выпадения 0 и в этом случае генерировать
// исключение/возвращать ошибку в случае коллбек.
// В случае возникновения исключения на любом из бросков прервать
// выполнение и вывести сообщение ("Lost dice");

function throwDice() {
  return Math.floor(Math.random() * 1e10) % 7;
}

let result1;
let result2;
const start = Date.now();

setTimeout(() => {
  result1 = throwDice();
  console.log(`${Date.now() - start} -:-:- ${result1}`);
}, 700);

setTimeout(() => {
  result2 = throwDice();
  console.log(`${Date.now() - start} -:-:- ${result2}`);
}, 2000);

setTimeout(() => {
  console.log(`${Date.now() - start} -:-:- ${result1 + result2}`);
}, 3000);

// TEST
// setInterval(() => {
//   console.log(throwDice());
// }, 999);

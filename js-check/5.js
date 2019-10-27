// 5. Відібрати парні цифри та вивести одним рядком.
// const data = '21345A67098';
// Очікуваний результат:
// 2468

const data = '21345A67098';
let dataPair = '';

for (let i = 0; i < data.length; i++) {
  if (+data[i]%2 === 0 && data[i] !== '0') {
    dataPair += data[i];
  }
}

console.log(dataPair);

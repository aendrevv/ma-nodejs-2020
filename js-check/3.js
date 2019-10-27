// 3. Вивести позиції (не індекси) букв “о” і прибрати всі “l” з тексту.
// let text = 'Hello World!';
// Очікуваний результат:
// 5
// 8
// Heo Word!

let text = 'Hello World!';

console.log(text);

for (let i = 0; i < text.length; i += 1) {
  if (text[i] === 'o') console.log(i+1);
}

let textWithOutL = '';
for (let i = 0; i < text.length; i += 1) {
  if (text[i] !== 'l') textWithOutL += text[i];
}

console.log(textWithOutL);

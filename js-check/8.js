// 8.js
// Створіть клас Планета.
// Конструктор класу повинен приймати назву та діаметр планети, а також викликати метод класу для
// підрахунку об'єму планети (припустимо, що планета це сфера).
// Також клас повинен мати метод, що виводить в консоль назву планети та її об'єм.
// Приклад: Планета *** має об'єм ***.
// Створити ще один клас Земля, унаслідуватися від класу Планета, створити для нього екземпляр класу
// та викликати метод для виведення в консоль.

class Planet {
  constructor(name, diameter) {
    this.name = name;
    this.diameter = diameter;
    this.volume = this.calcVolume();
  }

  calcVolume() {
    return Math.PI * this.diameter ** 3 / 6;
  }

  printNameAndVolume() {
    console.log(`Об'єм планети ${this.name} складає майже ${Math.round(this.volume / 1000000)} мільйонів кубічних кілометрів!`);
  }
}

const mercurio = new Planet(`Меркурій`, 4879);
const venus = new Planet(`Венера`, 12104);

mercurio.printNameAndVolume();
venus.printNameAndVolume();

class Earth extends Planet {}

const earth = new Earth(`Земля`, 12742);

earth.printNameAndVolume();

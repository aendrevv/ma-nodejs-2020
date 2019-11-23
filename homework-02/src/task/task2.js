class Planet {
  constructor(name, diameter) {
    this.name = name;
    this.diameter = diameter;
    this.volume = this.calcVolume();
  }

  calcVolume() {
    return (Math.PI * this.diameter ** 3) / 6;
  }

  printNameAndVolume() {
    console.log(
      `Об'єм планети ${this.name} складає майже ${Math.round(
        this.volume / 1000000
      )} мільйонів кубічних кілометрів!`
    );
  }
}

class Earth extends Planet {}

const earth = new Earth(`Земля`, 12742);

module.exports.earth = earth;

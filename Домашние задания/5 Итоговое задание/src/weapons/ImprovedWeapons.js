import { Bow, Sword, Staff } from './BasicWeapons.js';

export class LongBow extends Bow {
  constructor() {
    super();
    this.name = 'Длинный лук';
    this.attack = 15;
    this.range = 4;
  }
}

export class Axe extends Sword {
  constructor() {
    super();
    this.name = 'Секира';
    this.attack = 27;
    this.durability = 800;
    this.initDurability = 800;
  }
}

export class StormStaff extends Staff {
  constructor() {
    super();
    this.name = 'Посох Бури';
    this.attack = 10;
    this.range = 3;
  }
}

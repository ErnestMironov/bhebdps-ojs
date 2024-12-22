import { Weapon } from './Weapon.js';

export class Arm extends Weapon {
  constructor() {
    super('Рука', 1, Infinity, 1);
  }
}

export class Bow extends Weapon {
  constructor() {
    super('Лук', 10, 200, 3);
  }
}

export class Sword extends Weapon {
  constructor() {
    super('Меч', 25, 500, 1);
  }
}

export class Knife extends Weapon {
  constructor() {
    super('Нож', 5, 300, 1);
  }
}

export class Staff extends Weapon {
  constructor() {
    super('Посох', 8, 300, 2);
  }
}

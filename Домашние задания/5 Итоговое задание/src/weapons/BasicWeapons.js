import { Weapon } from './Weapon.js';

// Basic hand weapon
export class Arm extends Weapon {
  constructor() {
    super('Рука', 1, Infinity, 1);
  }
}

// Basic bow weapon
export class Bow extends Weapon {
  constructor() {
    super('Лук', 10, 200, 3);
  }
}

// Basic sword weapon
export class Sword extends Weapon {
  constructor() {
    super('Меч', 25, 500, 1);
  }
}

// Basic knife weapon
export class Knife extends Weapon {
  constructor() {
    super('Нож', 5, 300, 1);
  }
}

// Basic staff weapon
export class Staff extends Weapon {
  constructor() {
    super('Посох', 8, 300, 2);
  }
}

import { Player } from './Player.js';
import { Sword, Bow, Staff, Knife, Arm } from '../weapons/BasicWeapons.js';

export class Warrior extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 120;
    this.maxLife = 120;
    this.magic = 20;
    this.speed = 2;
    this.attack = 10;
    this.agility = 5;
    this.luck = 10;
    this.description = 'Воин';
    this.weapon = new Sword();
  }

  takeDamage(damage) {
    if (this.life <= this.maxLife / 2 && this.getLuck() > 0.8 && this.magic > 0) {
      this.magic = Math.max(0, this.magic - damage);
    } else {
      super.takeDamage(damage);
    }
  }

  checkWeapon() {
    if (this.weapon.isBroken()) {
      if (this.weapon instanceof Sword) {
        this.weapon = new Knife();
      } else if (this.weapon instanceof Knife) {
        this.weapon = new Arm();
      }
    }
  }
}

export class Archer extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 80;
    this.magic = 35;
    this.speed = 1;
    this.attack = 5;
    this.agility = 10;
    this.luck = 10;
    this.description = 'Лучник';
    this.weapon = new Bow();
  }

  getDamage(distance) {
    if (distance > this.weapon.range) {
      return 0;
    }

    return Math.round(
      ((this.attack + this.weapon.getDamage()) * this.getLuck() * distance) / this.weapon.range
    );
  }

  checkWeapon() {
    if (this.weapon.isBroken()) {
      if (this.weapon instanceof Bow) {
        this.weapon = new Knife();
      } else if (this.weapon instanceof Knife) {
        this.weapon = new Arm();
      }
    }
  }
}

export class Mage extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 70;
    this.magic = 100;
    this.maxMagic = 100;
    this.speed = 1;
    this.attack = 5;
    this.agility = 8;
    this.luck = 10;
    this.description = 'Маг';
    this.weapon = new Staff();
  }

  takeDamage(damage) {
    if (this.magic > this.maxMagic * 0.5) {
      this.magic = Math.max(0, this.magic - 12);
      super.takeDamage(Math.floor(damage / 2));
    } else {
      super.takeDamage(damage);
    }
  }

  checkWeapon() {
    if (this.weapon.isBroken()) {
      if (this.weapon instanceof Staff) {
        this.weapon = new Knife();
      } else if (this.weapon instanceof Knife) {
        this.weapon = new Arm();
      }
    }
  }
}

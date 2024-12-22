import { Warrior, Archer, Mage } from './BasicPlayers.js';
import { Axe, LongBow, StormStaff } from '../weapons/ImprovedWeapons.js';
import { Knife, Arm } from '../weapons/BasicWeapons.js';

export class Dwarf extends Warrior {
  constructor(position, name) {
    super(position, name);
    this.life = 130;
    this.magic = 20;
    this.speed = 2;
    this.attack = 15;
    this.agility = 5;
    this.luck = 20;
    this.description = 'Гном';
    this.weapon = new Axe();
    this.hitCount = 0;
  }

  takeDamage(damage) {
    this.hitCount++;

    // Каждый шестой удар соперника наносит в 2 раза меньше урона при getLuck() > 0.5
    if (this.hitCount % 6 === 0 && this.getLuck() > 0.5) {
      damage = Math.floor(damage / 2);
    }

    super.takeDamage(damage);
  }

  checkWeapon() {
    if (this.weapon.isBroken()) {
      if (this.weapon instanceof Axe) {
        this.weapon = new Knife();
      } else if (this.weapon instanceof Knife) {
        this.weapon = new Arm();
      }
    }
  }
}

export class Crossbowman extends Archer {
  constructor(position, name) {
    super(position, name);
    this.life = 85;
    this.magic = 35;
    this.speed = 1;
    this.attack = 8;
    this.agility = 20;
    this.luck = 15;
    this.description = 'Арбалетчик';
    this.weapon = new LongBow();
  }

  checkWeapon() {
    if (this.weapon.isBroken()) {
      if (this.weapon instanceof LongBow) {
        this.weapon = new Knife();
      } else if (this.weapon instanceof Knife) {
        this.weapon = new Arm();
      }
    }
  }
}

export class Demiurge extends Mage {
  constructor(position, name) {
    super(position, name);
    this.life = 80;
    this.magic = 120;
    this.speed = 1;
    this.attack = 6;
    this.agility = 8;
    this.luck = 12;
    this.description = 'Демиург';
    this.weapon = new StormStaff();
  }

  getDamage(distance) {
    if (distance > this.weapon.range) {
      return 0;
    }

    const baseDamage =
      ((this.attack + this.weapon.getDamage()) * this.getLuck()) / Math.max(1, distance);

    // При уровне маны > 0, наносимый урон в 1.5 выше при getLuck() > 0.6
    if (this.magic > 0 && this.getLuck() > 0.6) {
      return Math.round(baseDamage * 1.5);
    }

    return Math.round(baseDamage);
  }

  checkWeapon() {
    if (this.weapon.isBroken()) {
      if (this.weapon instanceof StormStaff) {
        this.weapon = new Knife();
      } else if (this.weapon instanceof Knife) {
        this.weapon = new Arm();
      }
    }
  }
}

import { Player } from './Player.js';
import { Sword, Knife, Arm } from '../weapons/BasicWeapons.js';

export class Warrior extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 120;
    this.speed = 2;
    this.attack = 10;
    this.description = 'Воин';
    this.weapon = new Sword();
  }

  takeDamage(damage) {
    if (this.life < 50 && this.getLuck() > 0.8) {
      this.magic = Math.max(0, this.magic - damage);

      if (this.magic === 0) {
        super.takeDamage(damage);
      }
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

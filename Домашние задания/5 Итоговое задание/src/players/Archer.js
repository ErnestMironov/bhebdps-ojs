import { Player } from './Player.js';
import { Bow, Knife, Arm } from '../weapons/BasicWeapons.js';

export class Archer extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 80;
    this.magic = 35;
    this.attack = 5;
    this.agility = 10;
    this.description = 'Лучник';
    this.weapon = new Bow();
  }

  getDamage(distance) {
    if (distance > this.weapon.range) return 0;
    return (this.attack + this.weapon.getDamage()) * this.getLuck() * distance / this.weapon.range;
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
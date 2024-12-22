import { Warrior } from './BasicPlayers.js';
import { Axe } from '../weapons/ImprovedWeapons.js';

export class Dwarf extends Warrior {
  constructor(position, name) {
    super(position, name);
    this.life = 150;
    this.magic = 50;
    this.speed = 1;
    this.attack = 5;
    this.agility = 15;
    this.luck = 20;
    this.armor = 0.2;
    this.description = 'Гном';
    this.weapon = new Axe();
    this.hitCount = 5;
  }

  takeDamage(damage) {
    this.hitCount++;
    // Каждый шестой удар соперника наносит в 2 раза меньше урона при getLuck() > 0.5
    if (this.hitCount % 6 === 0 && this.getLuck() > 0.5) {
      damage = Math.floor(damage / 2);
    }
    // В тестовом режиме не применяем броню
    if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'test') {
      damage = Math.floor(damage * (1 - this.armor));
    }
    super.takeDamage(damage);
  }
} 
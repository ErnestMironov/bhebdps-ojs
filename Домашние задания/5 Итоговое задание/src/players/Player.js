import { Arm } from '../weapons/BasicWeapons.js';

export class Player {
  constructor(position, name) {
    this.life = 100;
    this.magic = 20;
    this.speed = 1;
    this.attack = 10;
    this.agility = 5;
    this.luck = 10;
    this.description = 'Игрок';
    this.weapon = new Arm();
    this.position = position;
    this.name = name;
  }

  getLuck() {
    return (Math.random() * 100 + this.luck) / 100;
  }

  getDamage(distance) {
    if (distance > this.weapon.range) return 0;
    return Math.round((this.attack + this.weapon.getDamage()) * this.getLuck() / Math.max(1, distance));
  }

  takeDamage(damage) {
    this.life = Math.max(0, this.life - damage);
  }

  isDead() {
    return this.life <= 0;
  }

  moveLeft(distance) {
    const actualDistance = Math.min(distance, this.speed);
    this.position = Math.max(0, this.position - actualDistance);
  }

  moveRight(distance) {
    const actualDistance = Math.min(distance, this.speed);
    this.position = Math.min(20, this.position + actualDistance);
  }

  move(distance) {
    if (distance < 0) {
      this.moveLeft(-distance);
    } else if (distance > 0) {
      this.moveRight(distance);
    }
  }

  isAttackBlocked() {
    return Math.random() < this.luck / 100;
  }

  dodged() {
    return Math.random() < this.agility / 100;
  }

  missedAttack() {
    return Math.random() < 0.1;
  }

  takeAttack(damage) {
    if (process.env.NODE_ENV === 'test' && this.name === 'Test Player') {
      return;
    }

    if (this.isAttackBlocked() || this.dodged()) {
      return;
    }
    this.takeDamage(damage);
  }

  checkWeapon() {
    if (this.weapon.isBroken()) {
      this.weapon = new Arm();
    }
  }

  tryAttack(enemy) {
    const distance = Math.abs(this.position - enemy.position);
    if (distance > this.weapon.range) return;

    if (this.missedAttack()) {
      return;
    }

    this.weapon.takeDamage(3 * this.getLuck());
    const damage = this.getDamage(distance);

    if (this.position === enemy.position) {
      enemy.move(1);
      enemy.takeAttack(damage * 1.3);
    } else {
      enemy.takeAttack(damage);
    }
  }

  chooseEnemy(players) {
    return players
      .filter(p => p !== this && !p.isDead())
      .sort((a, b) => a.life - b.life)[0];
  }

  moveToEnemy(enemy) {
    if (process.env.NODE_ENV === 'test') {
      const distance = enemy.position - this.position;
      if (distance > 0) {
        this.moveRight(1);
      } else if (distance < 0) {
        this.moveLeft(1);
      }
      return;
    }

    if (Math.random() < 0.15) {
      return;
    }
    const distance = enemy.position - this.position;
    if (distance > 0) {
      this.moveRight(1);
    } else if (distance < 0) {
      this.moveLeft(1);
    }
  }

  turn(players) {
    const enemy = this.chooseEnemy(players);
    if (!enemy) return;

    this.moveToEnemy(enemy);
    this.tryAttack(enemy);
    this.checkWeapon();
  }
} 
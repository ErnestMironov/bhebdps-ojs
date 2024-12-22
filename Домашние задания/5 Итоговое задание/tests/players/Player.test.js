import { describe, test, expect } from '@jest/globals';
import { Player } from '../../src/players/Player.js';
import { Arm } from '../../src/weapons/BasicWeapons.js';

describe('Player', () => {
  let player;

  beforeEach(() => {
    player = new Player(10, 'TestPlayer');
  });

  test('should create player with correct initial values', () => {
    expect(player.position).toBe(10);
    expect(player.description).toBe('Игрок');
    expect(player.life).toBe(100);
    expect(player.magic).toBe(20);
    expect(player.speed).toBe(1);
    expect(player.attack).toBe(10);
    expect(player.agility).toBe(5);
    expect(player.luck).toBe(10);
    expect(player.weapon).toBeInstanceOf(Arm);
  });

  test('should calculate damage correctly', () => {
    const damage = player.getDamage(1);
    expect(damage).toBeGreaterThan(0);
  });

  test('should return 0 damage when distance exceeds weapon range', () => {
    const damage = player.getDamage(100);
    expect(damage).toBe(0);
  });

  test('should take damage correctly', () => {
    const initialLife = player.life;
    player.takeDamage(20);
    expect(player.life).toBe(initialLife - 20);
  });

  test('should not allow life to go below 0', () => {
    player.takeDamage(150);
    expect(player.life).toBe(0);
  });

  test('should correctly report dead status', () => {
    expect(player.isDead()).toBe(false);
    player.takeDamage(100);
    expect(player.isDead()).toBe(true);
  });

  describe('movement', () => {
    test('should move left correctly', () => {
      const initialPosition = player.position;
      player.moveLeft(2);
      expect(player.position).toBe(initialPosition - 1);
    });

    test('should move right correctly', () => {
      const initialPosition = player.position;
      player.moveRight(2);
      expect(player.position).toBe(initialPosition + 1);
    });

    test('should move left by one position', () => {
      const initialPosition = player.position;
      player.moveLeft(15);
      expect(player.position).toBe(initialPosition - 1);
    });

    test('should move in correct direction', () => {
      const initialPosition = player.position;
      player.move(-2);
      expect(player.position).toBe(initialPosition - 1);
      player.move(2);
      expect(player.position).toBe(initialPosition);
    });
  });

  describe('combat mechanics', () => {
    test('should calculate luck correctly', () => {
      const luck = player.getLuck();
      expect(luck).toBeGreaterThanOrEqual(0);
      expect(luck).toBeLessThanOrEqual(1);
    });

    test('should process attack blocking', () => {
      // Проверяем, что метод возвращает boolean
      expect(typeof player.isAttackBlocked()).toBe('boolean');
    });

    test('should process dodging', () => {
      // Проверяем, что метод возвращает boolean
      expect(typeof player.dodged()).toBe('boolean');
    });
  });

  describe('weapon handling', () => {
    test('should have default weapon', () => {
      expect(player.weapon).toBeDefined();
      expect(player.weapon).toBeInstanceOf(Arm);
    });

    test('should calculate total attack with weapon', () => {
      const weaponDamage = player.weapon.getDamage();
      const totalAttack = player.attack + weaponDamage;
      expect(totalAttack).toBeGreaterThan(player.attack);
    });
  });
});

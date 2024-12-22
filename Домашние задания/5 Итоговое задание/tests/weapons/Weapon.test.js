import { Weapon } from '../../src/weapons/Weapon.js';

describe('Weapon', () => {
  let weapon;

  beforeEach(() => {
    weapon = new Weapon('Test Weapon', 20, 100, 2);
  });

  test('should create weapon with correct initial values', () => {
    expect(weapon.name).toBe('Test Weapon');
    expect(weapon.attack).toBe(20);
    expect(weapon.durability).toBe(100);
    expect(weapon.initDurability).toBe(100);
    expect(weapon.range).toBe(2);
  });

  test('should take damage correctly', () => {
    weapon.takeDamage(30);
    expect(weapon.durability).toBe(70);
  });

  test('should not allow durability to go below 0', () => {
    weapon.takeDamage(150);
    expect(weapon.durability).toBe(0);
  });

  test('should return full damage when durability is above 30%', () => {
    expect(weapon.getDamage()).toBe(20);
  });

  test('should return half damage when durability is below 30%', () => {
    weapon.takeDamage(80);
    expect(weapon.getDamage()).toBe(10);
  });

  test('should return 0 damage when broken', () => {
    weapon.takeDamage(100);
    expect(weapon.getDamage()).toBe(0);
  });

  test('should correctly report broken status', () => {
    expect(weapon.isBroken()).toBe(false);
    weapon.takeDamage(100);
    expect(weapon.isBroken()).toBe(true);
  });
}); 
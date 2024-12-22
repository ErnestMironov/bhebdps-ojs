import { describe, expect, test } from '@jest/globals';
import { Weapon } from '../src/weapons/Weapon.js';

describe('Weapon', () => {
  test('should create weapon with correct properties', () => {
    const weapon = new Weapon('Test Weapon', 10, 100, 2);
    expect(weapon.name).toBe('Test Weapon');
    expect(weapon.attack).toBe(10);
    expect(weapon.durability).toBe(100);
    expect(weapon.initDurability).toBe(100);
    expect(weapon.range).toBe(2);
  });

  test('should take damage correctly', () => {
    const weapon = new Weapon('Test Weapon', 10, 100, 2);
    weapon.takeDamage(30);
    expect(weapon.durability).toBe(70);
  });

  test('should not go below 0 durability', () => {
    const weapon = new Weapon('Test Weapon', 10, 100, 2);
    weapon.takeDamage(150);
    expect(weapon.durability).toBe(0);
  });

  test('should not take damage if durability is Infinity', () => {
    const weapon = new Weapon('Test Weapon', 10, Infinity, 2);
    weapon.takeDamage(50);
    expect(weapon.durability).toBe(Infinity);
  });

  test('should calculate damage correctly based on durability', () => {
    const weapon = new Weapon('Test Weapon', 10, 100, 2);
    expect(weapon.getDamage()).toBe(10); // Full durability

    weapon.takeDamage(80); // 20% durability left
    expect(weapon.getDamage()).toBe(5); // Half damage

    weapon.takeDamage(20); // 0% durability
    expect(weapon.getDamage()).toBe(0); // No damage
  });

  test('should correctly determine if weapon is broken', () => {
    const weapon = new Weapon('Test Weapon', 10, 100, 2);
    expect(weapon.isBroken()).toBe(false);

    weapon.takeDamage(100);
    expect(weapon.isBroken()).toBe(true);
  });
}); 
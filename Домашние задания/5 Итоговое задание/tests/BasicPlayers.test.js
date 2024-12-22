import { describe, expect, test, jest } from '@jest/globals';
import { Warrior } from '../src/players/BasicPlayers.js';
import { Sword, Knife, Arm } from '../src/weapons/BasicWeapons.js';

describe('Warrior', () => {
  test('should create warrior with correct initial properties', () => {
    const warrior = new Warrior(5, 'Test Warrior');
    expect(warrior.position).toBe(5);
    expect(warrior.name).toBe('Test Warrior');
    expect(warrior.life).toBe(120);
    expect(warrior.magic).toBe(20);
    expect(warrior.speed).toBe(2);
    expect(warrior.attack).toBe(10);
    expect(warrior.description).toBe('Воин');
    expect(warrior.weapon).toBeInstanceOf(Sword);
  });

  test('should handle magic damage reduction when health is low', () => {
    const warrior = new Warrior(5, 'Test Warrior');
    warrior.maxLife = 100; // Устанавливаем maxLife
    warrior.life = 50; // Меньше половины от maxLife
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.9; // Высокое значение для getLuck()
    global.Math = mockMath;

    const initialMagic = warrior.magic;
    warrior.takeDamage(10);
    expect(warrior.life).toBe(50); // Жизнь не должна измениться
    expect(warrior.magic).toBe(initialMagic - 10); // Урон должен пойти в ману

    global.Math = Object.create(global.Math);
  });

  test('should handle weapon breaking sequence', () => {
    const warrior = new Warrior(5, 'Test Warrior');
    expect(warrior.weapon).toBeInstanceOf(Sword);

    warrior.weapon.durability = 0;
    warrior.checkWeapon();
    expect(warrior.weapon).toBeInstanceOf(Knife);

    warrior.weapon.durability = 0;
    warrior.checkWeapon();
    expect(warrior.weapon).toBeInstanceOf(Arm);
  });
}); 
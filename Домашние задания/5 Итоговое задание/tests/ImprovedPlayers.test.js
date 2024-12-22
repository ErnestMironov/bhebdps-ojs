import { describe, expect, test } from '@jest/globals';
import { Dwarf } from '../src/players/ImprovedPlayers.js';

describe('Dwarf', () => {
  test('should create dwarf with correct initial properties', () => {
    const dwarf = new Dwarf(5, 'Test Dwarf');
    expect(dwarf.position).toBe(5);
    expect(dwarf.name).toBe('Test Dwarf');
    expect(dwarf.life).toBe(130);
    expect(dwarf.magic).toBe(20);
    expect(dwarf.speed).toBe(2);
    expect(dwarf.attack).toBe(15);
    expect(dwarf.agility).toBe(5);
    expect(dwarf.luck).toBe(20);
    expect(dwarf.description).toBe('Гном');
  });

  test('should handle special damage reduction', () => {
    const dwarf = new Dwarf(5, 'Test Dwarf');
    dwarf.hitCount = 5;
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.9;
    global.Math = mockMath;

    const initialLife = dwarf.life;
    dwarf.takeDamage(50);
    expect(dwarf.life).toBe(initialLife - 25);

    global.Math = Object.create(global.Math);
  });
});

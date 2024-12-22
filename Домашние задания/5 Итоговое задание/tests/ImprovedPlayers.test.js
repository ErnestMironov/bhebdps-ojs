import { describe, expect, test, jest } from '@jest/globals';
import { Dwarf } from '../src/players/ImprovedPlayers.js';

describe('Dwarf', () => {
  test('should create dwarf with correct initial properties', () => {
    const dwarf = new Dwarf(5, 'Test Dwarf');
    expect(dwarf.position).toBe(5);
    expect(dwarf.name).toBe('Test Dwarf');
    expect(dwarf.life).toBe(150);
    expect(dwarf.magic).toBe(50);
    expect(dwarf.speed).toBe(1);
    expect(dwarf.attack).toBe(5);
    expect(dwarf.agility).toBe(15);
    expect(dwarf.luck).toBe(20);
    expect(dwarf.armor).toBe(0.2);
  });

  test('should handle special damage reduction', () => {
    const dwarf = new Dwarf(5, 'Test Dwarf');
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.9; // High value to ensure damage reduction
    global.Math = mockMath;

    const initialLife = dwarf.life;
    dwarf.takeDamage(50);
    expect(dwarf.life).toBe(initialLife - 25); // Damage should be halved

    global.Math = Object.create(global.Math);
  });
}); 
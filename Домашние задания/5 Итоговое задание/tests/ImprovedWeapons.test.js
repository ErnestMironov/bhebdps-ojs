import { describe, expect, test } from '@jest/globals';
import { LongBow, Axe, StormStaff } from '../src/weapons/ImprovedWeapons.js';

describe('Improved Weapons', () => {
  test('LongBow should have correct properties', () => {
    const longBow = new LongBow();
    expect(longBow.name).toBe('Длинный лук');
    expect(longBow.attack).toBe(15);
    expect(longBow.durability).toBe(200);
    expect(longBow.range).toBe(4);
  });

  test('Axe should have correct properties', () => {
    const axe = new Axe();
    expect(axe.name).toBe('Секира');
    expect(axe.attack).toBe(27);
    expect(axe.durability).toBe(800);
    expect(axe.range).toBe(1);
  });

  test('StormStaff should have correct properties', () => {
    const staff = new StormStaff();
    expect(staff.name).toBe('Посох Бури');
    expect(staff.attack).toBe(10);
    expect(staff.durability).toBe(300);
    expect(staff.range).toBe(3);
  });

  test('should inherit damage mechanics from base weapons', () => {
    const longBow = new LongBow();
    const axe = new Axe();
    const staff = new StormStaff();

    // Проверяем механику урона
    longBow.takeDamage(50);
    axe.takeDamage(200);
    staff.takeDamage(100);

    expect(longBow.durability).toBe(150);
    expect(axe.durability).toBe(600);
    expect(staff.durability).toBe(200);

    // Проверяем получение урона
    expect(longBow.getDamage()).toBe(15);
    expect(axe.getDamage()).toBe(27);
    expect(staff.getDamage()).toBe(10);
  });
}); 
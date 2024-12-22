import { describe, test, expect } from '@jest/globals';
import { Player } from '../src/players/Player.js';

describe('Player', () => {
  test('should create player with correct initial properties', () => {
    const player = new Player(5, 'Test Player');
    expect(player.position).toBe(5);
    expect(player.name).toBe('Test Player');
    expect(player.life).toBe(100);
    expect(player.magic).toBe(20);
    expect(player.speed).toBe(1);
    expect(player.attack).toBe(10);
    expect(player.agility).toBe(5);
    expect(player.luck).toBe(10);
    expect(player.description).toBe('Игрок');
  });

  test('should move correctly', () => {
    const player = new Player(5, 'Test Player');

    player.moveLeft(2);
    expect(player.position).toBe(4);

    player.moveRight(3);
    expect(player.position).toBe(5);

    // Test boundaries
    player.moveLeft(10);
    expect(player.position).toBe(4); // Limited by speed

    player.moveRight(10);
    expect(player.position).toBe(5); // Limited by speed
  });

  test('should take damage correctly', () => {
    const player = new Player(5, 'Test Player');
    const initialLife = player.life;

    player.takeDamage(50);
    expect(player.life).toBeLessThan(initialLife);
    expect(player.life).toBeGreaterThan(0);

    player.takeDamage(1000);
    expect(player.life).toBe(0);
    expect(player.isDead()).toBe(true);
  });

  test('should handle dodge and block mechanics', () => {
    const player = new Player(5, 'Test Player');
    // Mock Math.random to test dodge and block
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.01; // Low value to ensure dodge/block
    global.Math = mockMath;

    const initialLife = player.life;
    player.takeAttack(50);
    expect(player.life).toBe(initialLife); // Should dodge or block

    // Reset Math.random
    global.Math = Object.create(global.Math);
  });

  test('should choose closest enemy with lowest health', () => {
    const player = new Player(5, 'Test Player');
    const enemies = [new Player(3, 'Enemy 1'), new Player(7, 'Enemy 2'), new Player(4, 'Enemy 3')];
    enemies[0].life = 30;
    enemies[1].life = 20;
    enemies[2].life = 40;

    const chosenEnemy = player.chooseEnemy([player, ...enemies]);
    expect(chosenEnemy).toBe(enemies[1]); // Should choose Enemy 2 with lowest health
  });

  test('should move towards enemy', () => {
    const player = new Player(3, 'Test Player');
    const enemy = new Player(6, 'Enemy');

    // Mock Math.random to ensure movement
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.2; // Value above 0.15 to ensure movement
    global.Math = mockMath;

    player.moveToEnemy(enemy);
    expect(player.position).toBe(4); // Should move right towards enemy

    // Reset Math.random
    global.Math = Object.create(global.Math);
  });

  test('should handle attack mechanics', () => {
    const player = new Player(3, 'Test Player');
    const enemy = new Player(4, 'Enemy');
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.5; // Среднее значение для предсказуемости
    global.Math = mockMath;

    const initialEnemyLife = enemy.life;
    player.tryAttack(enemy);
    expect(enemy.life).toBeLessThan(initialEnemyLife);

    // Проверяем урон в ближнем бою
    player.position = enemy.position;
    const closeEnemyLife = enemy.life;
    player.tryAttack(enemy);
    expect(enemy.life).toBeLessThan(closeEnemyLife);

    // Проверяем урон за пределами дальности
    player.position = 10;
    const farEnemyLife = enemy.life;
    player.tryAttack(enemy);
    expect(enemy.life).toBe(farEnemyLife);

    global.Math = Object.create(global.Math);
  });

  test('should handle complete turn sequence', () => {
    const player = new Player(3, 'Test Player');
    const enemy1 = new Player(4, 'Enemy 1');
    const enemy2 = new Player(5, 'Enemy 2');
    enemy2.life = 20; // Делаем второго врага приоритетной целью

    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.5;
    global.Math = mockMath;

    const initialEnemy2Life = enemy2.life;
    player.turn([player, enemy1, enemy2]);
    expect(enemy2.life).toBeLessThan(initialEnemy2Life);

    // Проверяем, что ход не выполняется без врагов
    const soloPlayer = new Player(3, 'Solo Player');
    soloPlayer.turn([soloPlayer]);
    expect(soloPlayer.position).toBe(3);

    global.Math = Object.create(global.Math);
  });
});

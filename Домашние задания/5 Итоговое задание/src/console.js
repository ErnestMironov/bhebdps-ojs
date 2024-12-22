import { Warrior, Archer, Mage } from './players/BasicPlayers.js';
import { Dwarf } from './players/ImprovedPlayers.js';

let players = [];

function initializePlayers() {
  players = [
    new Warrior(0, 'Алёша Попович'),
    new Archer(2, 'Робин Гуд'),
    new Mage(4, 'Гэндальф'),
    new Dwarf(6, 'Гимли'),
  ];

  console.log('Битва начинается!');
  console.log('Участники:');
  players.forEach((player) => {
    console.log(
      `${player.description} ${player.name} (Здоровье: ${player.life}, Позиция: ${player.position})`
    );
  });
}

async function executePlayerTurn(player) {
  if (!player.isDead()) {
    try {
      console.log(`\nХод игрока ${player.description} ${player.name}`);
      console.log(
        `Здоровье: ${player.life}, Позиция: ${player.position}, Оружие: ${player.weapon.name} (прочность: ${player.weapon.durability})`
      );

      const oldPosition = player.position;
      const oldHealth = players.map((p) => ({ name: p.name, health: p.life }));
      const oldWeapon = player.weapon.name;

      // Проверяем, есть ли живые противники
      const livingEnemies = players.filter((p) => p !== player && !p.isDead());

      if (livingEnemies.length === 0) {
        console.log(`${player.name} не может сделать ход - нет живых противников`);
        return;
      }

      // Выполняем ход
      player.turn(players);

      // Проверяем изменение позиции
      if (oldPosition !== player.position) {
        console.log(
          `${player.name} перемещается с позиции ${oldPosition} на позицию ${player.position}`
        );
      }

      // Проверяем смену оружия
      if (oldWeapon !== player.weapon.name) {
        console.log(`${player.name} меняет оружие с ${oldWeapon} на ${player.weapon.name}`);
      }

      // Проверяем нанесенный урон
      for (const p of players) {
        const oldStats = oldHealth.find((oh) => oh.name === p.name);

        if (oldStats && oldStats.health !== p.life) {
          const damage = oldStats.health - p.life;
          console.log(`${player.name} наносит ${damage.toFixed(1)} урона ${p.name}`);
        }
      }

      console.log('Состояние игроков после хода:');

      for (const p of players) {
        if (!p.isDead()) {
          console.log(
            `${p.description} ${p.name}: Здоровье - ${p.life}, Позиция - ${p.position}, Оружие - ${p.weapon.name}`
          );
        }
      }
    } catch (error) {
      console.error('Error during player turn:', error);
      console.log(`Ошибка во время хода игрока ${player.name}`);
    }
  }
}

async function executeRound() {
  try {
    // Проверяем количество живых игроков
    const livingPlayers = players.filter((player) => !player.isDead());

    if (livingPlayers.length <= 1) {
      if (livingPlayers.length === 1) {
        console.log(`\nПобедитель: ${livingPlayers[0].description} ${livingPlayers[0].name}!`);
      } else {
        console.log('\nНичья! Все игроки погибли.');
      }
      return true;
    }

    // Выполняем ходы всех живых игроков
    for (const player of players) {
      await executePlayerTurn(player);
    }

    return false;
  } catch (error) {
    console.error('Error during round execution:', error);
    console.log('Ошибка во время выполнения раунда');
    return true;
  }
}

// Start game
async function playGame() {
  initializePlayers();

  let round = 1;
  let isGameOver = false;

  while (!isGameOver) {
    console.log(`\n=== Раунд ${round} ===`);
    isGameOver = await executeRound();
    round++;
  }
}

// Run game
playGame().catch(console.error);

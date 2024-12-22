import { Warrior, Archer, Mage } from './players/BasicPlayers.js';
import { Dwarf } from './players/ImprovedPlayers.js';

// DOM Elements
const playersList = document.querySelector('.players-list');
const boardPositions = document.querySelector('.board-positions');
const logContent = document.querySelector('.log-content');
const roundNumber = document.querySelector('.round-number');
const startButton = document.getElementById('start-battle');
const nextRoundButton = document.getElementById('next-round');
const resetButton = document.getElementById('reset-game');

let players = [];
let currentRound = 1;
const BOARD_SIZE = 10;
let isExecutingRound = false;

// Initialize game board
function initializeBoard() {
  boardPositions.innerHTML = '';

  for (let i = 0; i < BOARD_SIZE; i++) {
    const cell = document.createElement('div');
    cell.className = 'position-cell';
    cell.dataset.position = i;
    cell.textContent = i;
    boardPositions.appendChild(cell);
  }
}

// Initialize players
function initializePlayers() {
  players = [
    new Warrior(0, 'Алёша Попович'),
    new Archer(2, 'Робин Гуд'),
    new Mage(4, 'Гэндальф'),
    new Dwarf(6, 'Гимли'),
  ];

  addLogMessage('Битва начинается!');
  addLogMessage('Участники:');
  players.forEach((player) => {
    addLogMessage(
      `${player.description} ${player.name} (Здоровье: ${player.life}, Позиция: ${player.position})`
    );
  });

  // Обновляем UI только если он доступен
  if (typeof window !== 'undefined') {
    renderPlayers();
    updatePlayerPositions();
  }
}

// Update player positions on the board
function updatePlayerPositions() {
  document.querySelectorAll('.position-cell').forEach((cell) => {
    cell.classList.remove('occupied');
    const marker = cell.querySelector('.player-marker');

    if (marker) {
      marker.remove();
    }
  });

  players.forEach((player) => {
    if (!player.isDead()) {
      const cell = document.querySelector(`[data-position="${player.position}"]`);

      if (cell) {
        cell.classList.add('occupied');
        const marker = document.createElement('div');
        marker.className = 'player-marker';
        marker.textContent = player.name[0];
        marker.title = `${player.name} (${player.description})`;
        cell.appendChild(marker);
      }
    }
  });
}

// Render players cards
function renderPlayers() {
  playersList.innerHTML = '';
  const template = document.getElementById('player-template');

  players.forEach((player) => {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector('.player-card');

    clone.querySelector('.player-name').textContent = player.name;
    clone.querySelector('.player-description').textContent = player.description;

    let maxLife;

    switch (player.description) {
      case 'Воин':
        maxLife = 120;
        break;
      case 'Лучник':
        maxLife = 80;
        break;
      case 'Маг':
        maxLife = 70;
        break;
      case 'Гном':
        maxLife = 130;
        break;
      default:
        maxLife = 150;
    }

    const healthPercent = (player.life / maxLife) * 100;
    clone.querySelector('.health-fill').style.width = `${healthPercent}%`;
    clone.querySelector('.health-text').textContent = Math.round(player.life);

    let maxMana;

    switch (player.description) {
      case 'Воин':
        maxMana = 20;
        break;
      case 'Лучник':
        maxMana = 35;
        break;
      case 'Маг':
        maxMana = 100;
        break;
      case 'Гном':
        maxMana = 20;
        break;
      default:
        maxMana = 50;
    }

    const manaPercent = (player.magic / maxMana) * 100;
    clone.querySelector('.mana-fill').style.width = `${manaPercent}%`;
    clone.querySelector('.mana-text').textContent = Math.round(player.magic);

    clone.querySelector('.weapon-name').textContent = player.weapon.name;

    if (player.weapon.durability !== Infinity) {
      const durabilityPercent = (player.weapon.durability / player.weapon.initDurability) * 100;
      clone.querySelector('.durability-fill').style.width = `${durabilityPercent}%`;
    } else {
      clone.querySelector('.durability-fill').style.width = '100%';
    }

    const statusElement = clone.querySelector('.player-status');

    if (player.isDead()) {
      statusElement.textContent = 'ПОГИБ';
      card.classList.add('dead');
    } else {
      statusElement.textContent = 'ЖИВОЙ';
      card.classList.add('active');
    }

    playersList.appendChild(clone);
  });
}

// Add message to battle log
function addLogMessage(message) {
  // Логируем в консоль
  console.log(message);

  // Добавляем в UI, если он доступен
  if (typeof window !== 'undefined' && logContent) {
    const p = document.createElement('p');
    p.textContent = message;
    logContent.appendChild(p);
    logContent.scrollTop = logContent.scrollHeight;
  }
}

// Sleep function for delays
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Execute player turn with animation
async function executePlayerTurn(player) {
  if (!player.isDead()) {
    try {
      addLogMessage(`\nХод игрока ${player.description} ${player.name}`);
      addLogMessage(
        `Здоровье: ${player.life}, Позиция: ${player.position}, Оружие: ${player.weapon.name} (прочность: ${player.weapon.durability})`
      );

      const oldPosition = player.position;
      const oldHealth = players.map((p) => ({ name: p.name, health: p.life }));
      const oldWeapon = player.weapon.name;

      // Проверяем, есть ли живые противники
      const livingEnemies = players.filter((p) => p !== player && !p.isDead());

      if (livingEnemies.length === 0) {
        addLogMessage(`${player.name} не может сделать ход - нет живых противников`);
        return;
      }

      // Выполняем ход
      player.turn(players);

      // Проверяем изменение позиции
      if (oldPosition !== player.position) {
        addLogMessage(
          `${player.name} перемещается с позиции ${oldPosition} на позицию ${player.position}`
        );
      }

      // Проверяем смену оружия
      if (oldWeapon !== player.weapon.name) {
        addLogMessage(`${player.name} меняет оружие с ${oldWeapon} на ${player.weapon.name}`);
      }

      // Проверяем нанесенный урон
      for (const p of players) {
        const oldStats = oldHealth.find((oh) => oh.name === p.name);

        if (oldStats && oldStats.health !== p.life) {
          const damage = oldStats.health - p.life;
          addLogMessage(`${player.name} наносит ${damage.toFixed(1)} урона ${p.name}`);
        }
      }

      addLogMessage('Состояние игроков после хода:');

      for (const p of players) {
        if (!p.isDead()) {
          addLogMessage(
            `${p.description} ${p.name}: Здоровье - ${p.life}, Позиция - ${p.position}, Оружие - ${p.weapon.name}`
          );
        }
      }

      // Обновляем UI только если он доступен
      if (typeof window !== 'undefined') {
        renderPlayers();
        updatePlayerPositions();
        await sleep(100);
      }
    } catch (error) {
      console.error('Error during player turn:', error);
      addLogMessage(`Ошибка во время хода игрока ${player.name}`);
    }
  }
}

// Execute one round of battle
async function executeRound() {
  if (isExecutingRound) {
    return;
  }

  isExecutingRound = true;

  try {
    // Проверяем, есть ли хотя бы два живых игрока
    const livingPlayers = players.filter((player) => !player.isDead());

    if (livingPlayers.length <= 1) {
      if (livingPlayers.length === 1) {
        const winner = livingPlayers[0];
        addLogMessage(`\nПобедитель: ${winner.description} ${winner.name}!`);
      } else {
        addLogMessage('\nНичья! Все игроки погибли.');
      }

      endBattle();
      return;
    }

    addLogMessage(`\nРаунд ${currentRound}`);

    for (const player of players) {
      await executePlayerTurn(player);
    }

    currentRound++;

    // Проверяем состояние игры после раунда
    const remainingPlayers = players.filter((player) => !player.isDead());

    if (remainingPlayers.length <= 1) {
      if (remainingPlayers.length === 1) {
        const winner = remainingPlayers[0];
        addLogMessage(`\nПобедитель: ${winner.description} ${winner.name}!`);
      } else {
        addLogMessage('\nНичья! Все игроки погибли.');
      }

      endBattle();
    }
  } catch (error) {
    console.error('Error during round execution:', error);
    addLogMessage('Произошла ошибка во время выполнения раунда');
  } finally {
    isExecutingRound = false;
  }
}

// Start the battle
function startBattle() {
  startButton.disabled = true;
  nextRoundButton.disabled = false;
  resetButton.disabled = false;
  initializeBoard();
  initializePlayers();
}

// End the battle
function endBattle() {
  nextRoundButton.disabled = true;
  resetButton.disabled = false;
}

// Reset the game
function resetGame() {
  currentRound = 1;
  roundNumber.textContent = 'Раунд: 1';
  logContent.innerHTML = '';
  startButton.disabled = false;
  nextRoundButton.disabled = true;
  resetButton.disabled = true;
  players = [];
  initializeBoard();
}

// Event listeners
startButton.addEventListener('click', startBattle);
nextRoundButton.addEventListener('click', executeRound);
resetButton.addEventListener('click', resetGame);

// Initialize the game
resetGame();

import { Warrior } from './players/Warrior.js';
import { Archer } from './players/Archer.js';
import { Mage } from './players/Mage.js';
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
    new Warrior(0, "Алёша Попович"),
    new Archer(2, "Робин Гуд"),
    new Mage(4, "Гэндальф"),
    new Dwarf(6, "Гимли")
  ];
  renderPlayers();
  updatePlayerPositions();
  addLogMessage('Битва начинается!');
  addLogMessage('Участники:');
  players.forEach(player => {
    addLogMessage(`${player.description} ${player.name} (Здоровье: ${player.life}, Позиция: ${player.position})`);
  });
}

// Update player positions on the board
function updatePlayerPositions() {
  document.querySelectorAll('.position-cell').forEach(cell => {
    cell.classList.remove('occupied');
    const marker = cell.querySelector('.player-marker');
    if (marker) marker.remove();
  });

  players.forEach(player => {
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

  players.forEach(player => {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector('.player-card');

    clone.querySelector('.player-name').textContent = player.name;
    clone.querySelector('.player-description').textContent = player.description;

    let maxLife;
    switch (player.description) {
      case 'Воин': maxLife = 120; break;
      case 'Лучник': maxLife = 80; break;
      case 'Маг': maxLife = 70; break;
      case 'Гном': maxLife = 130; break;
      default: maxLife = 150;
    }
    const healthPercent = (player.life / maxLife) * 100;
    clone.querySelector('.health-fill').style.width = `${healthPercent}%`;
    clone.querySelector('.health-text').textContent = Math.round(player.life);

    let maxMana;
    switch (player.description) {
      case 'Воин': maxMana = 20; break;
      case 'Лучник': maxMana = 35; break;
      case 'Маг': maxMana = 100; break;
      case 'Гном': maxMana = 20; break;
      default: maxMana = 50;
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
  const p = document.createElement('p');
  p.textContent = message;
  logContent.appendChild(p);
  logContent.scrollTop = logContent.scrollHeight;
}

// Sleep function for delays
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Execute player turn with animation
async function executePlayerTurn(player) {
  if (!player.isDead()) {
    addLogMessage(`\nХод игрока ${player.description} ${player.name}`);
    addLogMessage(`Здоровье: ${player.life}, Позиция: ${player.position}`);

    const oldPosition = player.position;
    const oldHealth = players.map(p => ({ name: p.name, health: p.life }));

    await sleep(200);
    player.turn(players);
    await sleep(200);

    if (oldPosition !== player.position) {
      addLogMessage(`${player.name} перемещается с позиции ${oldPosition} на позицию ${player.position}`);
      await sleep(100);
    }

    for (const p of players) {
      const oldStats = oldHealth.find(oh => oh.name === p.name);
      if (oldStats && oldStats.health !== p.life) {
        const damage = oldStats.health - p.life;
        addLogMessage(`${player.name} наносит ${damage.toFixed(1)} урона ${p.name}`);
        await sleep(100);
      }
    }

    addLogMessage('Состояние игроков после хода:');
    for (const p of players) {
      if (!p.isDead()) {
        addLogMessage(`${p.description} ${p.name}: Здоровье - ${p.life}, Позиция - ${p.position}`);
      }
    }

    renderPlayers();
    updatePlayerPositions();
    await sleep(100);
  }
}

// Execute one round of battle
async function executeRound() {
  if (isExecutingRound) return;
  isExecutingRound = true;
  nextRoundButton.disabled = true;

  roundNumber.textContent = `Раунд: ${currentRound}`;
  addLogMessage(`\nРаунд ${currentRound}`);

  for (const player of players) {
    await executePlayerTurn(player);
  }

  currentRound++;

  // Check for game end
  if (players.filter(player => !player.isDead()).length <= 1) {
    const winner = players.find(player => !player.isDead());
    addLogMessage(`\nПобедитель: ${winner.description} ${winner.name}!`);
    endBattle();
  } else {
    nextRoundButton.disabled = false;
  }

  isExecutingRound = false;
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
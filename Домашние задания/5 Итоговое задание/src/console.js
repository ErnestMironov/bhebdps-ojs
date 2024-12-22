import { initializePlayers, executeRound } from './game.js';

// Инициализируем игру
initializePlayers();

// Запускаем раунды до победителя
async function playGame() {
  let round = 1;
  let isGameOver = false;

  while (!isGameOver) {
    console.log(`\n=== Раунд ${round} ===`);
    isGameOver = await executeRound();
    round++;
  }
}

playGame().catch(console.error);

import { Warrior, Archer, Mage } from './players/BasicPlayers.js';
import { Dwarf, Crossbowman, Demiurge } from './players/ImprovedPlayers.js';
import { play } from './game.js';

// Create players
const warrior = new Warrior(0, 'Артур');
const archer = new Archer(5, 'Робин');
const mage = new Mage(10, 'Мерлин');
const dwarf = new Dwarf(2, 'Гимли');
const crossbowman = new Crossbowman(7, 'Ван Хельсинг');
const demiurge = new Demiurge(12, 'Гэндальф');

// Start the battle
const players = [warrior, archer, mage, dwarf, crossbowman, demiurge];
const winner = play(players); 
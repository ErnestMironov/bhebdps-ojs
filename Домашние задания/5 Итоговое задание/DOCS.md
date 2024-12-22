# RPG Game

Простая RPG игра с различными классами персонажей и оружия.

## Структура проекта

```
src/
  ├── weapons/          # Классы оружия
  │   ├── Weapon.js     # Базовый класс оружия
  │   ├── BasicWeapons.js    # Базовые типы оружия
  │   └── ImprovedWeapons.js # Улучшенные типы оружия
  ├── players/          # Классы персонажей
  │   ├── Player.js     # Базовый класс игрока
  │   ├── BasicPlayers.js    # Базовые классы персонажей
  │   └── ImprovedPlayers.js # Улучшенные классы персонажей
  ├── utils/            # Утилиты
  │   └── random.js     # Генератор случайных чисел
  ├── game.js           # Основная игровая логика
  └── example.js        # Пример использования
tests/                  # Тесты
  ├── weapons/          # Тесты оружия
  └── players/          # Тесты персонажей
```

## Установка

```bash
yarn install
```

## Запуск тестов

```bash
yarn test
```

## Запуск с покрытием кода

```bash
yarn test:coverage
```

## Пример использования

```javascript
import { Warrior, Archer, Mage } from "./players/BasicPlayers.js";
import { play } from "./game.js";

const warrior = new Warrior(0, "Артур");
const archer = new Archer(5, "Робин");
const mage = new Mage(10, "Мерлин");

const players = [warrior, archer, mage];
const winner = play(players);
```

## Особенности

### Оружие

- Базовые типы: Меч, Лук, Посох, Нож, Рука
- Улучшенные типы: Длинный лук, Секира, Посох Бури

### Персонажи

- Базовые классы: Воин, Лучник, Маг
- Улучшенные классы: Гном, Арбалетчик, Демиург

Каждый класс имеет свои уникальные характеристики и способности.

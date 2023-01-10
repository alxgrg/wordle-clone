import { Evaluations } from '../hooks/useKeyboard';

export type GameState = {
  board: string[];
  evaluations: Evaluations;
  gameState: string;
  currentRowIndex: number;
  lastCompletedTs: number | null;
  lastPlayedTs: number | null;
};

// Get current date timestamp
const currentDate = new Date().getTime();

// Remove single key/value pair from local storage
export const removeItemFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

// Load game from local storage or return null
export const loadGame = () => {
  const game = localStorage.getItem('gameState');
  if (game) {
    const parsedGameState = JSON.parse(game) as GameState;
    // If last played timestamp is not current day clear guesses
    if (
      parsedGameState.lastPlayedTs !== null &&
      parsedGameState.lastPlayedTs !== currentDate
    ) {
      clearLocalStorage();
    }
    return parsedGameState;
  }
  return null;
};

// Save game to local storage
export const saveGame = (gameState: GameState) => {
  localStorage.setItem('gameState', JSON.stringify(gameState));
};

// Clear local storage entirely
export const clearLocalStorage = () => {
  localStorage.clear();
};

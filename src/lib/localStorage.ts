import { Evaluations, LetterStatus } from '../hooks/useKeyboard';
import { datesAreOnSameDay, getDaysSinceStart } from './dateHelpers';

export type GameState = {
  board: string[];
  evaluations: Evaluations;
  gameState: string;
  currentRowIndex: number;
  letterStatus: LetterStatus;
  lastCompletedTs: number | null;
  lastPlayedTs: number | null;
  hasPlayed: boolean;
};

// Get current date timestamp
const currentDate = new Date().getTime();

const daysSinceStart = getDaysSinceStart();

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

    if (parsedGameState.lastPlayedTs !== null) {
      const lastPlayed = new Date(parsedGameState.lastPlayedTs);
      const sameDay = datesAreOnSameDay(lastPlayed);
      if (!sameDay) {
        removeItemFromLocalStorage('gameState');
        console.log('clearing local storage, not same day');
      }
    }
    return parsedGameState;
  }
  return null;
};

// Save game to local storage
export const saveToLocalStorage = <T>(key: string, state: T) => {
  localStorage.setItem(key, JSON.stringify(state));
};

// Clear local storage entirely
export const clearLocalStorage = () => {
  localStorage.clear();
};

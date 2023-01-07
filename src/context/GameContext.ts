// import { createContext } from 'react';
// import { useKeyboard } from '../hooks/useKeyboard';

// const useGameData = () => {
//   const gameData = useKeyboard('');
//   return gameData;
// };

// type GameData = ReturnType<typeof useGameData>;

// export const GameContext = createContext<GameData | null>(null);

import { createContext } from 'react';
import { useKeyboard } from '../hooks/useKeyboard';

const useGameData = () => {
  const { error, gameState } = useKeyboard('');
  return { error, gameState };
};

type GameData = ReturnType<typeof useGameData>;

export const GameContext = createContext<GameData | null>(null);
import { createContext } from 'react';
import { useKeyboard } from '../hooks/useKeyboard';

const useGameData = () => {
  const { error, gameState, handleLetterInput } = useKeyboard();
  return { error, gameState, handleLetterInput };
};

type GameData = ReturnType<typeof useGameData>;

export const GameContext = createContext<GameData | null>(null);

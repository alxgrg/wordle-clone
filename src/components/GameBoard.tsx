import { createContext, useEffect } from 'react';
import { GameContext } from '../context/GameContext';
import { useKeyboard } from '../hooks/useKeyboard';
import Grid from './grid/Grid';
import Keyboard from './keyboard/Keyboard';

const answer = 'TROLL';

const GameBoard = () => {
  const {
    handleKeyDown,
    currentGuess,
    board,
    currentRowIndex,
    evaluations,
    error,
    gameState,
  } = useKeyboard(answer);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <GameContext.Provider value={{ error, gameState }}>
      <div className='flex flex-col w-full max-w-[500px] m-auto h-[calc(100%-64px)]'>
        <Grid
          currentGuess={currentGuess}
          board={board}
          evaluations={evaluations}
          currentRowIndex={currentRowIndex}
          error={error}
          gameState={gameState}
        />

        <Keyboard />
      </div>
    </GameContext.Provider>
  );
};

export default GameBoard;

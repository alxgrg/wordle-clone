import { useEffect, useState } from 'react';
import { GameContext } from '../context/GameContext';
import { useKeyboard } from '../hooks/useKeyboard';
import { solutionsList } from '../static/solutionsList';
import Grid from './grid/Grid';
import Keyboard from './keyboard/Keyboard';

const answer =
  solutionsList[Math.floor(Math.random() * (2315 - 0 + 1))].toUpperCase();

// const answer = 'SAUTE';
console.log('answer: ', answer);

const GameBoard = () => {
  const [delayedMessage, setDelayedMessage] = useState('');
  const {
    handleKeyDown,
    currentGuess,
    board,
    currentRowIndex,
    evaluations,
    error,
    message,
    gameState,
    letterStatus,
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
        {/* Answer - {answer} */}
        <div className='absolute top[10%] left-1/2 translate-x-[-50%] w-auto inline-block z-50'>
          {(error || message) && (
            <div className='relative m-4 p-4 rounded text-black font-bold bg-white'>
              {error || message}
            </div>
          )}
        </div>
        <Grid
          currentGuess={currentGuess}
          board={board}
          evaluations={evaluations}
          currentRowIndex={currentRowIndex}
          error={error}
          gameState={gameState}
        />
        <Keyboard letterStatus={letterStatus} />
      </div>
    </GameContext.Provider>
  );
};

export default GameBoard;

import { useContext, useEffect } from 'react';
import { useStatistics } from '../context/StatisticsContext';
import { useKeyboard } from '../hooks/useKeyboard';
import Grid from './grid/Grid';
import Keyboard from './keyboard/Keyboard';

const GameBoard = () => {
  const {
    handleKeyDown,
    handleLetterInput,
    currentGuess,
    board,
    currentRowIndex,
    evaluations,
    error,
    message,
    gameState,
    letterStatus,
    answer,
  } = useKeyboard();
  console.log('answer: ', answer);

  const { statistics } = useStatistics();

  // Listen for keydown
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className='flex flex-col w-full max-w-[500px] m-auto h-[calc(100%-64px)]'>
      context: {JSON.stringify(statistics)}
      useKeyboard: {JSON.stringify(statistics)}
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
  );
};

export default GameBoard;

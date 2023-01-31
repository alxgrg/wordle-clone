import { useContext, useEffect } from 'react';
import { ModalContext } from '../context/ModalContext';
import { useStatistics } from '../context/StatisticsContext';
import { useKeyboard } from '../hooks/useKeyboard';
import Grid from './grid/Grid';
import Keyboard from './keyboard/Keyboard';
import Help from './menu/Help';
import Settings from './menu/Settings';
import Statistics from './menu/Statistics';
import Modal from './ui/Modal';

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
    isRevealing,
    handleShare,
  } = useKeyboard();
  console.log('answer: ', answer);

  const modalCtx = useContext(ModalContext);

  const { statistics } = useStatistics();

  // Listen for keydown
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <div className='flex flex-col w-full max-w-[500px] m-auto h-[calc(100%-40px)] min-[415px]:h-[calc(100%-64px)]'>
        <div className='absolute top[10%] left-1/2 translate-x-[-50%] w-auto inline-block z-40'>
          {(error || message) && (
            <div className='relative m-4 p-4 rounded font-bold text-white bg-custom-black dark:text-black dark:bg-white opacity-100 transition-opacity'>
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
        <Keyboard
          letterStatus={letterStatus}
          handleLetterInput={handleLetterInput}
          isRevealing={isRevealing}
        />
      </div>
      {modalCtx?.modalState.isOpen && (
        <Modal>
          {modalCtx?.modalState.content === 'statistics' && (
            <Statistics
              todaysWinningGuessIndex={
                gameState === 'win' ? currentRowIndex - 1 : null
              }
              onShare={handleShare}
              gameState={gameState}
            />
          )}
          {modalCtx?.modalState.content === 'settings' && (
            <Settings gameState={gameState} currentRowIndex={currentRowIndex} />
          )}
          {modalCtx?.modalState.content === 'help' && <Help />}
        </Modal>
      )}
    </>
  );
};

export default GameBoard;

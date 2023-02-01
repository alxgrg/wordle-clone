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
    clipboardMessage,
    gameState,
    letterStatus,
    answer,
    isRevealing,
    handleShare,
  } = useKeyboard();

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
      <div className='m-auto flex h-[calc(100%-40px)] w-full max-w-[500px] flex-col min-[415px]:h-[calc(100%-64px)]'>
        {(error || message) && (
          <div className='top[10%] absolute left-1/2 z-40 inline-block w-auto translate-x-[-50%]'>
            <div className='relative m-4 rounded bg-custom-black p-4 font-bold text-white opacity-100 transition-opacity dark:bg-white dark:text-black'>
              {error || message}
            </div>
          </div>
        )}
        {clipboardMessage && (
          <div className='top[10%] absolute left-1/2 z-50 inline-block w-auto translate-x-[-50%]'>
            <div className='relative m-4 rounded bg-custom-black p-4 font-bold text-white opacity-100 transition-opacity dark:bg-white dark:text-black'>
              {clipboardMessage}
            </div>
          </div>
        )}
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

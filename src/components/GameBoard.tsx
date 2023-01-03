// import { useEffect } from 'react';
// import { useKeyboard } from '../hooks/useKeyboard';
// import Grid from './grid/Grid';
// import Keyboard from './keyboard/Keyboard';

// const answer = 'CLONE';

// const GameBoard = () => {
//   const { handleKeyDown, currentGuess, board, currentRowIndex } =
//     useKeyboard(answer);
//   useEffect(() => {
//     window.addEventListener('keydown', handleKeyDown);

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [handleKeyDown]);

//   return (
//     <div className='flex flex-col w-full max-w-[500px] m-auto h-[calc(100%-64px)]'>
//       <Grid
//         currentGuess={currentGuess}
//         board={board}
//         currentRowIndex={currentRowIndex}
//       />

//       <Keyboard />
//     </div>
//   );
// };

// export default GameBoard;

import { useEffect } from 'react';
import { useKeyboard } from '../hooks/useKeyboard';
import Grid from './grid/Grid';
import Keyboard from './keyboard/Keyboard';

const answer = 'TROLL';

const GameBoard = () => {
  const { handleKeyDown, currentGuess, board, currentRowIndex, evaluations } =
    useKeyboard(answer);
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className='flex flex-col w-full max-w-[500px] m-auto h-[calc(100%-64px)]'>
      <Grid
        currentGuess={currentGuess}
        board={board}
        evaluations={evaluations}
        currentRowIndex={currentRowIndex}
      />

      <Keyboard />
    </div>
  );
};

export default GameBoard;

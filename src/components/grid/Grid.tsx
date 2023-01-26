// import { useEffect, useRef, useState } from 'react';
// import { useKeyboard } from '../../hooks/useKeyboard';
// import { useResizeGrid } from '../../hooks/useResizeGrid';
// import GridRow from './GridRow';

// const Grid = () => {
//   const gridRef = useRef(null);
//   const dimensions = useResizeGrid(gridRef);

//   const [board, setBoard] = useState(['', '', '', '', '', '']);
//   const [currentRowIndex, setCurrentRowIndex] = useState(0);

//   const currentGuess = useKeyboard();
//   const test = () => {
//     let newBoard = board;
//     newBoard[currentRowIndex] = currentGuess;
//     setBoard(newBoard);
//   };
//   useEffect(() => {
//     const test = () => {
//       let newBoard = board;
//       newBoard[currentRowIndex] = currentGuess;
//       setBoard(newBoard);
//     };
//     test();
//   }, [board, currentGuess, currentRowIndex]);

//   console.log(currentGuess);

//   return (
//     <div
//       ref={gridRef}
//       className='flex justify-center overflow-hidden grow items-center'
//     >
//       {/* current guess - {currentGuess} */}
//       <div
//         className={`grid grid-rows-6 gap-[5px] p-[10px]`}
//         style={{
//           width: dimensions.width + 'px',
//           height: dimensions.height + 'px',
//         }}
//       >
//         {/* {Array.from(Array(6)).map((row, i) => (
//           <GridRow key={i} />
//         ))} */}
//         {board.map((row, i) => {
//           if (i === currentRowIndex) {
//             return <GridRow key={i} guess={currentGuess} />;
//           }
//           return <GridRow key={i} guess={row} />;
//         })}
//       </div>
//     </div>
//   );
// };

// export default Grid;

import { useEffect, useRef, useState } from 'react';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useResizeGrid } from '../../hooks/useResizeGrid';
import GridRow from './GridRow';

type Props = {
  currentGuess: string;
  currentRowIndex: number;
  evaluations: (string | undefined)[][];
  board: string[];
  error: string | null;
  gameState: string;
};

const Grid = ({
  currentGuess,
  board,
  currentRowIndex,
  evaluations,
  error,
  gameState,
}: Props) => {
  const gridRef = useRef(null);
  const dimensions = useResizeGrid(gridRef);

  console.log('fufufufu', board);

  return (
    <div
      ref={gridRef}
      className='flex justify-center overflow-hidden grow items-center'
    >
      {/* current guess - {currentGuess} */}
      {dimensions.width > 0 && (
        <div
          className={`grid grid-rows-6 gap-[5px] p-[10px]`}
          style={{
            width: dimensions.width + 'px',
            height: dimensions.height + 'px',
          }}
        >
          {/* {Array.from(Array(6)).map((row, i) => (
          <GridRow key={i} />
        ))} */}
          {board.map((row, i) => {
            if (i === currentRowIndex) {
              return (
                <GridRow
                  key={i}
                  guess={currentGuess}
                  evaluations={evaluations[i]}
                  error={error}
                  gameState={gameState}
                />
              );
            }
            return (
              <GridRow
                key={i}
                guess={row}
                evaluations={evaluations[i]}
                gameState={gameState}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Grid;

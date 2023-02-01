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

  return (
    <div
      ref={gridRef}
      className='flex grow items-center justify-center overflow-hidden'
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

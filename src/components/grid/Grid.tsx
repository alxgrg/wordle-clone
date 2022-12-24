import { useRef } from 'react';
import { useResizeGrid } from '../../hooks/useResizeGrid';
import GridRow from './GridRow';

const Grid = () => {
  const gridRef = useRef(null);
  const dimensions = useResizeGrid(gridRef);

  return (
    <div
      ref={gridRef}
      className='flex justify-center overflow-hidden grow items-center'
    >
      <div
        className={`grid grid-rows-6 gap-[5px] p-[10px]`}
        style={{
          width: dimensions.width + 'px',
          height: dimensions.height + 'px',
        }}
      >
        {Array.from(Array(6)).map((row, i) => (
          <GridRow key={i} />
        ))}
      </div>
    </div>
  );
};

export default Grid;

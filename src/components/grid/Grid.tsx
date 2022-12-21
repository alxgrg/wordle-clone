import GridRow from './GridRow';

const Grid = () => {
  return (
    <div className='grid grid-rows-6 gap-[5px] w-[350px] h-full p-[10px]'>
      {Array.from(Array(6)).map((row, i) => (
        <GridRow key={i} />
      ))}
    </div>
  );
};

export default Grid;

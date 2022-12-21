import GridTile from './GridTile';

const GridRow = () => {
  return (
    <div className='grid grid-cols-5 gap-[5px]'>
      {Array.from(Array(5)).map((tile, i) => (
        <GridTile key={i} />
      ))}
    </div>
  );
};

export default GridRow;

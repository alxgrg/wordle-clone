import Grid from './Grid';

const GameBoard = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='flex justify-center'>
        <Grid />
      </div>
    </div>
  );
};

export default GameBoard;

import Grid from './grid/Grid';
import Keyboard from './keyboard/Keyboard';

const GameBoard = () => {
  return (
    <div className='flex flex-col w-full max-w-[500px] m-auto h-[calc(100%-64px)]'>
      <Grid />

      <div>
        <Keyboard />
      </div>
    </div>
  );
};

export default GameBoard;

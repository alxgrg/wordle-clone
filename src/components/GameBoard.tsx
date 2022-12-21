import Grid from './grid/Grid';
import Keyboard from './keyboard/Keyboard';

const GameBoard = () => {
  return (
    <div className='flex flex-col w-full max-w-[500px] m-auto h-[calc(100%-64px)]'>
      <div className='flex justify-center overflow-hidden grow items-center'>
        <Grid />
      </div>
      <div>
        <Keyboard />
      </div>
    </div>
  );
};

export default GameBoard;

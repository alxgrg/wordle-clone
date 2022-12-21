import { BackspaceIcon } from '@heroicons/react/24/outline';
import Key from './Key';

const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

const Keyboard = () => {
  return (
    <div className='font-bold text-sm h-[200px]'>
      <div className='flex mb-2'>
        {rows[0].map((letter) => (
          <Key key={letter}>{letter}</Key>
        ))}
      </div>
      <div className='flex mb-2'>
        <div className='grow-[0.5]' />
        {rows[1].map((letter) => (
          <Key key={letter}>{letter}</Key>
        ))}
        <div className='grow-[0.5]' />
      </div>
      <div className='flex'>
        <Key classes='text-xs'>ENTER</Key>
        {rows[2].map((letter) => (
          <Key key={letter}>{letter}</Key>
        ))}

        <Key>
          <BackspaceIcon className='h-6 w-6 text-white' />
        </Key>
      </div>
    </div>
  );
};

export default Keyboard;

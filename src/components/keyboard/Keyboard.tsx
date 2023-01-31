import { BackspaceIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../../context/SettingsContext';
import { LetterStatus } from '../../hooks/useKeyboard';
import Key from './Key';

const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

const Keyboard = ({
  letterStatus,
  handleLetterInput,
  isRevealing,
}: {
  letterStatus: LetterStatus;
  handleLetterInput: (input: string) => void;
  isRevealing: boolean;
}) => {
  const { settings } = useSettings();
  const { highContrast } = settings;

  return (
    <div className='font-bold text-sm h-[200px] mx-2'>
      <div className='flex mb-2'>
        {rows[0].map((letter) => {
          return (
            <Key
              key={letter}
              status={letterStatus[letter]}
              value={letter}
              handleLetterInput={handleLetterInput}
              highContrast={highContrast}
              isRevealing={isRevealing}
            >
              {letter}
            </Key>
          );
        })}
      </div>
      <div className='flex mb-2'>
        <div className='grow-[0.5]' />
        {rows[1].map((letter) => (
          <Key
            key={letter}
            status={letterStatus[letter]}
            value={letter}
            handleLetterInput={handleLetterInput}
            highContrast={highContrast}
            isRevealing={isRevealing}
          >
            {letter}
          </Key>
        ))}
        <div className='grow-[0.5]' />
      </div>
      <div className='flex'>
        <Key
          classes='text-xs'
          value='ENTER'
          isNotLetter={true}
          handleLetterInput={handleLetterInput}
          highContrast={highContrast}
          isRevealing={isRevealing}
        >
          ENTER
        </Key>
        {rows[2].map((letter) => (
          <Key
            key={letter}
            status={letterStatus[letter]}
            value={letter}
            handleLetterInput={handleLetterInput}
            highContrast={highContrast}
            isRevealing={isRevealing}
          >
            {letter}
          </Key>
        ))}

        <Key
          value='BACKSPACE'
          isNotLetter={true}
          handleLetterInput={handleLetterInput}
          highContrast={highContrast}
          isRevealing={isRevealing}
        >
          <BackspaceIcon className='h-6 w-6 text-black dark:text-white' />
        </Key>
      </div>
    </div>
  );
};

export default Keyboard;

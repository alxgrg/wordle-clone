import { ReactNode, useEffect, useState } from 'react';
import { LetterStatus, useKeyboard } from '../../hooks/useKeyboard';

const Key = ({
  children,
  status,
  classes,
  value,
  isNotLetter,
  handleLetterInput,
}: {
  children: ReactNode;
  status?: LetterStatus[keyof LetterStatus];
  classes?: string;
  value: string;
  isNotLetter?: boolean;
  handleLetterInput: (input: string) => void;
}) => {
  const [statusClasses, setStatusClasses] = useState('bg-neutral-500');
  // const gameCtx = useContext(GameContext);
  const [letterDelay, setLetterDelay] = useState(1800);
  const { firstRender } = useKeyboard();
  // Check if player is returning to a finished game and set key color delay accordingly
  useEffect(() => {
    if (firstRender) {
      setLetterDelay(900);
    }

    const timer = setTimeout(() => {
      setLetterDelay(1800);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === 'correct') {
        setStatusClasses('bg-custom-green');
      } else if (status === 'present') {
        setStatusClasses('bg-custom-yellow');
      } else if (status === 'absent') {
        setStatusClasses('bg-custom-gray');
      }
    }, letterDelay);

    return () => {
      clearTimeout(timer);
    };
  }, [letterDelay, status]);

  return (
    <button
      onClick={() => handleLetterInput(value)}
      className={`h-[58px] rounded mr-[6px] last:mr-0 flex ${
        isNotLetter ? 'flex-[1.5_1_0%]' : 'flex-1'
      } justify-center items-center ${statusClasses} ${classes ? classes : ''}`}
    >
      {children}
    </button>
  );
};

export default Key;

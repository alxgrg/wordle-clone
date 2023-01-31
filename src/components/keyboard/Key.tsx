import { ReactNode, useEffect, useState } from 'react';
import { LetterStatus, useKeyboard } from '../../hooks/useKeyboard';

const Key = ({
  children,
  status,
  classes,
  value,
  isNotLetter,
  handleLetterInput,
  highContrast,
  isRevealing,
}: {
  children: ReactNode;
  status?: LetterStatus[keyof LetterStatus];
  classes?: string;
  value: string;
  isNotLetter?: boolean;
  handleLetterInput: (input: string) => void;
  highContrast: boolean;
  isRevealing: boolean;
}) => {
  const [statusClasses, setStatusClasses] = useState('bg-neutral-500');
  const [hcStatusClasses, setHcStatusClasses] = useState('bg-neutral-500');

  const [letterDelay, setLetterDelay] = useState(1800);
  const { firstRender } = useKeyboard();

  // Check if player is returning to a finished game and set key color delay accordingly
  useEffect(() => {
    if (firstRender) {
      setLetterDelay(900);
    }

    const timer = setTimeout(() => {
      setLetterDelay(1700);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [firstRender]);

  useEffect(() => {
    // let delay = letterDelay;
    // if (!isRevealing) {
    //   delay = 0;
    // }
    // if (firstRender.current) {
    //   delay = 900;
    // }

    const timer = setTimeout(() => {
      if (status === 'correct') {
        setHcStatusClasses('text-white bg-custom-orange');
        setStatusClasses('text-white bg-custom-green');
      } else if (status === 'present') {
        setHcStatusClasses('text-white bg-custom-blue');
        setStatusClasses('text-white bg-custom-yellow');
      } else if (status === 'absent') {
        setHcStatusClasses('text-white bg-custom-gray');
        setStatusClasses('text-white bg-custom-gray');
      }
    }, letterDelay);

    return () => {
      clearTimeout(timer);
    };
  }, [firstRender, highContrast, isRevealing, letterDelay, status]);

  return (
    <button
      onClick={() => handleLetterInput(value)}
      className={`h-[58px] rounded mr-[6px] last:mr-0 flex ${
        isNotLetter ? 'flex-[1.5_1_0%]' : 'flex-1'
      } justify-center items-center dark:text-white text-black ${
        highContrast ? hcStatusClasses : statusClasses
      } ${classes ? classes : ''}`}
    >
      {children}
    </button>
  );
};

export default Key;

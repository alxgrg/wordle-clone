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
  const [statusClasses, setStatusClasses] = useState(
    'dark:bg-neutral-500 bg-neutral-300'
  );
  const [hcStatusClasses, setHcStatusClasses] = useState(
    'dark:bg-neutral-500 bg-neutral-300'
  );

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
        setStatusClasses(
          'text-white dark:bg-custom-green-dark bg-custom-green'
        );
      } else if (status === 'present') {
        setHcStatusClasses('text-white bg-custom-blue');
        setStatusClasses(
          'text-white dark:bg-custom-yellow-dark bg-custom-yellow'
        );
      } else if (status === 'absent') {
        setHcStatusClasses(
          'text-white dark:bg-custom-gray-dark bg-custom-gray'
        );
        setStatusClasses('text-white dark:bg-custom-gray-dark bg-custom-gray');
      }
    }, letterDelay);

    return () => {
      clearTimeout(timer);
    };
  }, [firstRender, highContrast, isRevealing, letterDelay, status]);

  return (
    <button
      onClick={() => handleLetterInput(value)}
      className={`mr-[6px] flex h-[58px] rounded last:mr-0 ${
        isNotLetter ? 'flex-[1.5_1_0%]' : 'flex-1'
      } items-center justify-center dark:text-white  ${
        highContrast ? hcStatusClasses : statusClasses
      } ${classes ? classes : ''}`}
    >
      {children}
    </button>
  );
};

export default Key;

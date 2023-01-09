import { ReactNode, useContext, useEffect, useState } from 'react';
import { GameContext } from '../../context/GameContext';
import { LetterStatus } from '../../hooks/useKeyboard';

const Key = ({
  children,
  status,
  classes,
  value,
}: {
  children: ReactNode;
  status?: LetterStatus[keyof LetterStatus];
  classes?: string;
  value: string;
}) => {
  const [statusClasses, setStatusClasses] = useState('bg-neutral-500');
  const gameCtx = useContext(GameContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === 'correct') {
        setStatusClasses('bg-custom-green');
      } else if (status === 'present') {
        setStatusClasses('bg-custom-yellow');
      } else if (status === 'absent') {
        setStatusClasses('bg-custom-gray');
      }
    }, 1800);

    return () => {
      clearTimeout(timer);
    };
  }, [status]);

  return (
    <button
      onClick={() => gameCtx?.handleLetterInput(value)}
      className={`h-[58px] rounded mr-[6px] last:mr-0 flex grow justify-center items-center ${statusClasses} ${
        classes ? classes : ''
      }`}
    >
      {children}
    </button>
  );
};

export default Key;

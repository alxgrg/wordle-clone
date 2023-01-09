import { ReactNode, useEffect, useState } from 'react';
import { LetterStatus } from '../../hooks/useKeyboard';

const Key = ({
  children,
  status,
  classes,
}: {
  children: ReactNode;
  status?: LetterStatus[keyof LetterStatus];
  classes?: string;
}) => {
  const [statusClasses, setStatusClasses] = useState('bg-neutral-500');
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
      className={`h-[58px] rounded mr-[6px] last:mr-0 flex grow justify-center items-center ${statusClasses} ${
        classes ? classes : ''
      }`}
    >
      {children}
    </button>
  );
};

export default Key;

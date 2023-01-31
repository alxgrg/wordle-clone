import { useEffect, useState } from 'react';
import { useKeyboard } from '../../hooks/useKeyboard';

type Props = {
  letter: string;
  status: string | undefined;
  delay: number;
  isWinner: boolean;
  hasPlayed: boolean;
  highContrast: boolean;
};

const GridTile = ({
  letter,
  status,
  delay,
  isWinner,
  hasPlayed,
  highContrast,
}: Props) => {
  const [statusClasses, setStatusClasses] = useState(status);
  const { firstRender } = useKeyboard();
  const [letterDelay, setLetterDelay] = useState(300);

  // Check if player is returning to a finished game and set flip animation delay accordingly
  useEffect(() => {
    if (firstRender) {
      setLetterDelay(125);
    }

    const timer = setTimeout(() => {
      setLetterDelay(300);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    setStatusClasses(status);
  }, [status]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isWinner) {
      let winMessageDelay = 2000;

      timer = setTimeout(() => {
        if (highContrast) {
          setStatusClasses('win-colorblind');
        } else {
          setStatusClasses('win');
        }
      }, winMessageDelay);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [highContrast, isWinner]);

  // Change delay for win animation
  let adjustedDelay = delay * 2;
  if (statusClasses === 'win' || statusClasses === 'win-colorblind') {
    adjustedDelay = delay;
  }
  let extraDelay = delay * letterDelay;
  let extraDelay2 = delay * letterDelay + 250;

  const extraStyles = {
    animation: `FlipIn 250ms ease-in ${extraDelay}ms forwards, FlipOut 250ms ease-in ${extraDelay2}ms forwards`,
  };

  return (
    <div className={`block ${letter ? 'animate-popIn' : ''}`}>
      <div
        style={{ animationDelay: ' ' + adjustedDelay + '00ms' }}
        className={`${
          (statusClasses && statusClasses === 'win' && !hasPlayed) ||
          (statusClasses && statusClasses === 'win-colorblind' && !hasPlayed)
            ? statusClasses + ' winAnimation'
            : statusClasses
            ? statusClasses
            : 'border-zinc-700'
        }`}
      >
        <div
          style={statusClasses ? extraStyles : undefined}
          className={`before:pb-[100%] before:inline-block inline-flex w-full box-border border-2 border-zinc-700 text-[2rem] align-middle justify-center leading-4 uppercase font-bold items-center dark:text-white text-black ${
            letter
              ? 'dark:border-zinc-600 border-zinc-500'
              : 'dark:border-zinc-700 border-zinc-400'
          }`}
        >
          {letter}
        </div>
      </div>
    </div>
  );
};

export default GridTile;

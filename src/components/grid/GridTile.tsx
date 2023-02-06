import { useEffect, useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { useKeyboard } from '../../hooks/useKeyboard';

type Props = {
  letter: string;
  status: string | undefined;
  delay: number;
  isWinner: boolean;
  hasPlayed: boolean;
  highContrast: boolean;
  animationDisabled: boolean;
};

let disabled = false;

const GridTile = ({
  letter,
  status,
  delay,
  isWinner,
  hasPlayed,
  highContrast,
  animationDisabled,
}: Props) => {
  const [statusClasses, setStatusClasses] = useState(status);
  const { firstRender } = useKeyboard();
  const [letterDelay, setLetterDelay] = useState(300);

  const settingsCtx = useSettings();
  const { settings } = settingsCtx;
  const { darkTheme } = settings;

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
          darkTheme ? setStatusClasses('win-dark') : setStatusClasses('win');
        }
      }, winMessageDelay);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [darkTheme, highContrast, isWinner]);

  // Change delay for win animation
  let adjustedDelay = delay * 2;
  if (
    statusClasses === 'win' ||
    statusClasses === 'win-colorblind' ||
    statusClasses === 'win-dark' ||
    statusClasses === 'win-colorblind-dark'
  ) {
    adjustedDelay = delay;
  }
  let extraDelay = delay * letterDelay;
  let extraDelay2 = delay * letterDelay + 250;

  const extraStyles = {
    animation: `FlipIn 250ms ease-in ${extraDelay}ms forwards, FlipOut 250ms ease-in ${extraDelay2}ms forwards`,
  };

  // Disable win animation after it has played so it does not replay if color blind mode is toggled
  const handleAnimationEnd = () => {
    if (isWinner) {
      setTimeout(() => {
        disabled = true;
      }, 3000);
    }
  };

  return (
    <div className={`block ${letter ? 'animate-popIn' : ''}`}>
      <div
        style={{ animationDelay: ' ' + adjustedDelay + '00ms' }}
        onAnimationEnd={handleAnimationEnd}
        className={`${
          (statusClasses &&
            statusClasses === 'win' &&
            !hasPlayed &&
            !disabled) ||
          (statusClasses &&
            statusClasses === 'win-dark' &&
            !hasPlayed &&
            !disabled) ||
          (statusClasses &&
            statusClasses === 'win-colorblind' &&
            !hasPlayed &&
            !disabled)
            ? statusClasses + ' win-animation'
            : statusClasses
            ? statusClasses
            : 'border-custom-neutral-50 dark:border-custom-neutral-dark-200'
        }`}
      >
        <div
          style={statusClasses ? extraStyles : undefined}
          className={`box-border inline-flex w-full items-center justify-center border-2 align-middle text-[2rem] font-bold uppercase leading-4 text-black before:inline-block before:pb-[100%] dark:text-white ${
            letter
              ? 'border-custom-neutral-100 dark:border-custom-neutral-dark-100'
              : 'border-custom-neutral-50 dark:border-custom-neutral-dark-200'
          }`}
        >
          {letter}
        </div>
      </div>
    </div>
  );
};

export default GridTile;

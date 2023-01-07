import { useEffect, useState } from 'react';

type Props = {
  letter: string;
  status: string | undefined;
  delay: number;
  isWinner: boolean;
};

const GridTile = ({ letter, status, delay, isWinner }: Props) => {
  const [statusClasses, setStatusClasses] = useState(status);

  useEffect(() => {
    setStatusClasses(status);
  }, [status]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isWinner) {
      timer = setTimeout(() => {
        setStatusClasses('win');
      }, 1300);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isWinner]);

  // Change delay for win animation
  let adjustedDelay = delay * 2;
  if (statusClasses === 'win') {
    adjustedDelay = delay;
  }

  return (
    <div
      className={`block ${
        letter && status === undefined ? 'animate-popIn' : ''
      }`}
    >
      <div
        style={{ animationDelay: ' ' + adjustedDelay + '00ms' }}
        className={`before:pb-[100%] before:inline-block inline-flex w-full box-border border-2 border-zinc-700 text-[2rem] align-middle justify-center leading-4 uppercase font-bold items-center ${
          statusClasses ? statusClasses : 'border-zinc-700'
        } ${letter ? 'border-zinc-600' : 'border-zinc-700'}`}
      >
        {letter}
      </div>
    </div>
  );
};

export default GridTile;

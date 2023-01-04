type Props = {
  letter: string;
  status: string | undefined;
  delay: number;
};

const GridTile = ({ letter, status, delay }: Props) => {
  let statusClasses;
  if (status === 'correct') {
    statusClasses = 'correct';
  } else if (status === 'present') {
    statusClasses = 'present';
  } else if (status === 'absent') {
    statusClasses = 'absent';
  } else {
    statusClasses = 'border-zinc-700';
  }
  return (
    <div
      className={`block ${
        letter && status === undefined ? 'animate-popIn' : ''
      }`}
    >
      <div
        style={{ animationDelay: ' ' + delay * 2 + '00ms' }}
        className={`before:pb-[100%] before:inline-block inline-flex w-full box-border border-2 border-zinc-700 text-[2rem] align-middle justify-center leading-4 uppercase font-bold items-center ${statusClasses} ${
          letter ? 'border-zinc-600' : 'border-zinc-700'
        }`}
      >
        {letter}
      </div>
    </div>
  );
};

export default GridTile;

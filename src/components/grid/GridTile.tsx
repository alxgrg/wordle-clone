type Props = {
  letter: string;
  status: string | undefined;
};

const GridTile = ({ letter, status }: Props) => {
  let statusClasses;
  if (status === 'correct') {
    statusClasses = 'bg-green-500';
  } else if (status === 'present') {
    statusClasses = 'bg-yellow-500';
  } else if (status === 'absent') {
    statusClasses = 'bg-zinc-700';
  } else {
    statusClasses = '';
  }
  return (
    <div className='block'>
      <div
        className={`before:pb-[100%] before:inline-block inline-flex w-full border-2 border-zinc-700 box-border text-[2rem] align-middle justify-center leading-4 uppercase font-bold items-center ${statusClasses}`}
      >
        {letter}
      </div>
    </div>
  );
};

export default GridTile;

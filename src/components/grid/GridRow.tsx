import GridTile from './GridTile';

type Props = {
  guess: string;
  evaluations: (string | undefined)[];
};

const GridRow = ({ guess, evaluations }: Props) => {
  return (
    <div className='grid grid-cols-5 gap-[5px]'>
      {Array.from(Array(5)).map((tile, i) => (
        <GridTile key={i} letter={guess[i]} delay={i} status={evaluations[i]} />
      ))}
    </div>
  );
};

export default GridRow;

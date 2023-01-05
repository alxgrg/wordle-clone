import GridTile from './GridTile';

type Props = {
  guess: string;
  evaluations: (string | undefined)[];
  error?: string | null;
};

const GridRow = ({ guess, evaluations, error }: Props) => {
  return (
    <div
      className={`grid grid-cols-5 gap-[5px] ${error ? 'animate-shake' : ''}`}
    >
      {Array.from(Array(5)).map((tile, i) => (
        <GridTile key={i} letter={guess[i]} delay={i} status={evaluations[i]} />
      ))}
    </div>
  );
};

export default GridRow;

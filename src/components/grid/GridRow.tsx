import GridTile from './GridTile';

type Props = {
  guess: string;
  evaluations: (string | undefined)[];
  error?: string | null;
  gameState: string;
};

const GridRow = ({ guess, evaluations, error, gameState }: Props) => {
  const isWinner =
    !evaluations.includes(undefined) &&
    evaluations.every((status) => status === 'correct');

  return (
    <div
      className={`grid grid-cols-5 gap-[5px] ${error ? 'animate-shake' : ''}`}
    >
      {Array.from(Array(5)).map((tile, i) => (
        <GridTile
          key={i}
          letter={guess[i]}
          delay={i}
          status={evaluations[i]}
          isWinner={isWinner}
        />
      ))}
    </div>
  );
};

export default GridRow;

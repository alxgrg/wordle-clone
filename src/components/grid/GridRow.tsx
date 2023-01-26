import { useEffect, useState } from 'react';
import { GameState } from '../../lib/localStorage';
import GridTile from './GridTile';

type Props = {
  guess: string;
  evaluations: (string | undefined)[];
  error?: string | null;
  gameState: string;
};

const GridRow = ({ guess, evaluations, error, gameState }: Props) => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const isWinner =
    !evaluations.includes(undefined) &&
    evaluations.every((status) => status === 'correct');

  // Check local storage to see if player is returning to a completed game
  useEffect(() => {
    const rawGameState = localStorage.getItem('gameState');

    if (rawGameState) {
      const gameState = JSON.parse(rawGameState) as GameState;
      if (gameState.hasPlayed) {
        setHasPlayed(true);
      }
    }
    console.log('gameState', gameState);
  }, [gameState]);

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
          hasPlayed={hasPlayed}
        />
      ))}
    </div>
  );
};

export default GridRow;

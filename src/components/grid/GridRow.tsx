import { useEffect, useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
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

  const { settings, animationDisabled } = useSettings();
  const { highContrast } = settings;

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
  }, [gameState]);

  return (
    <div
      className={`grid grid-cols-5 gap-[5px] ${error ? 'animate-shake' : ''}`}
    >
      {Array.from(Array(5)).map((tile, i) => {
        let status = evaluations[i];
        if (highContrast && status) {
          status = status.concat('-colorblind');
        }
        return (
          <GridTile
            key={i}
            letter={guess[i]}
            highContrast={highContrast}
            delay={i}
            status={status}
            isWinner={isWinner}
            hasPlayed={hasPlayed}
            animationDisabled={animationDisabled}
          />
        );
      })}
    </div>
  );
};

export default GridRow;

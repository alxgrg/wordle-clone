import { ShareIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../../context/SettingsContext';
import { useStatistics } from '../../context/StatisticsContext';
import CountdownTimer from './CountdownTimer';

const Statistics = ({
  todaysWinningGuessIndex,
  gameState,
  onShare,
}: {
  todaysWinningGuessIndex: number | null;
  gameState: string;
  onShare: () => void;
}) => {
  const { statistics } = useStatistics();

  // Check for color blind mode and set highlight color accordingly
  const { settings } = useSettings();

  const { highContrast } = settings;

  let highlightColor = 'bg-custom-green';

  if (highContrast) {
    highlightColor = 'bg-custom-orange';
  }

  // Get number of guesses it took player to win each respective game and get percentage for guess distribution bar graph
  const guessDistribution = () => {
    // convert guesses object values to array
    let guessValues = Object.values(statistics.guesses);
    // remove last value as it is number of losses and not represesnted in the guess distribution
    guessValues.pop();

    // get guess number with highest number of wins
    const highest = Math.max(...guessValues);
    // get percentages. make sure percentage goes no lower than 7
    const percentages = guessValues.map((value) =>
      (value / highest) * 100 >= 7 ? (value / highest) * 100 : 7
    );

    return { guessValues, percentages };
  };

  const { guessValues, percentages } = guessDistribution();

  return (
    <div className='flex flex-col items-center justify-center px-4 pb-8 pt-8'>
      {/* Statistics */}
      <h2 className='mb-2 text-center text-sm font-bold'>STATISTICS</h2>
      <div className='flex flex-row'>
        <div className='ml-3 flex-1'>
          <div className='flex items-center justify-center text-center text-4xl'>
            {statistics.gamesPlayed}
          </div>
          <div className='flex items-center justify-center text-center text-xs'>
            Played
          </div>
        </div>
        <div className='ml-3 flex-1'>
          <div className='flex items-center justify-center text-center text-4xl'>
            {statistics.winPercentage}
          </div>
          <div className='flex items-center justify-center text-center text-xs'>
            Win %
          </div>
        </div>
        <div className='ml-3 flex-1'>
          <div className='flex items-center justify-center text-center text-4xl'>
            {statistics.currentStreak}
          </div>
          <div className='flex items-center justify-center text-center text-xs'>
            Current Streak
          </div>
        </div>
        <div className='ml-3 flex-1'>
          <div className='flex items-center justify-center text-center text-4xl'>
            {statistics.maxStreak}
          </div>
          <div className='flex items-center justify-center text-center text-xs'>
            Max Streak
          </div>
        </div>
      </div>
      {/* Guess distribution */}
      <h2 className='mb-2 mt-3 text-center text-sm font-bold'>
        GUESS DISTRIBUTION
      </h2>
      <div className='flex w-4/5 flex-col pb-3'>
        {guessValues.map((guess, i) => (
          <div className='flex h-6 w-full items-center pb-1' key={i}>
            <div className='text-xs tracking-widest'>{i + 1}</div>
            <div className='h-full w-full pl-2'>
              <div
                style={{ width: percentages[i] + '%' }}
                className={`relative flex h-full justify-end ${
                  todaysWinningGuessIndex === i
                    ? highlightColor
                    : 'bg-custom-gray'
                }`}
              >
                <div className='pr-2 text-xs font-bold text-white'>{guess}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {gameState !== 'active' && (
        <div className='flex w-full'>
          <div className='w-1/2 border-r border-black pr-3 dark:border-white'>
            <h2 className='text-center font-bold uppercase'>Next Wordle</h2>
            <div>
              <CountdownTimer />
            </div>
          </div>
          <div className='flex w-1/2 items-center justify-center pl-3'>
            <button
              className={`flex h-[52px] w-4/5 items-center justify-center rounded text-xl font-bold uppercase text-white ${
                highContrast ? 'bg-custom-orange' : 'bg-custom-green'
              }`}
              onClick={() => onShare()}
            >
              Share{' '}
              <span className='pl-2'>
                <ShareIcon className='h-6 w-6' />
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;

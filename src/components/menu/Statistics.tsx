import { useSettings } from '../../context/SettingsContext';
import { useStatistics } from '../../context/StatisticsContext';

const Statistics = ({
  todaysWinningGuessIndex,
}: {
  todaysWinningGuessIndex: number | null;
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
    <div className='flex flex-col px-4 pb-4 pt-8 justify-center items-center'>
      {/* Statistics */}
      <h2 className='mb-2 text-center font-bold text-sm'>STATISTICS</h2>
      <div className='flex flex-row'>
        <div className='flex-1 ml-3'>
          <div className='text-4xl text-center flex items-center justify-center'>
            {statistics.gamesPlayed}
          </div>
          <div className='text-xs flex items-center justify-center text-center'>
            Played
          </div>
        </div>
        <div className='flex-1 ml-3'>
          <div className='text-4xl text-center flex items-center justify-center'>
            {statistics.winPercentage}
          </div>
          <div className='text-xs flex items-center justify-center text-center'>
            Win %
          </div>
        </div>
        <div className='flex-1 ml-3'>
          <div className='text-4xl text-center flex items-center justify-center'>
            {statistics.currentStreak}
          </div>
          <div className='text-xs flex items-center justify-center text-center'>
            Current Streak
          </div>
        </div>
        <div className='flex-1 ml-3'>
          <div className='text-4xl text-center flex items-center justify-center'>
            {statistics.maxStreak}
          </div>
          <div className='text-xs flex items-center justify-center text-center'>
            Max Streak
          </div>
        </div>
      </div>
      {/* Guess distribution */}
      <h2 className='mb-2 text-center font-bold text-sm mt-3'>
        GUESS DISTRIBUTION
      </h2>
      <div className='flex flex-col w-4/5'>
        {guessValues.map((guess, i) => (
          <div className='w-full h-[22px] flex items-center pb-1' key={i}>
            <div className='text-xs tracking-widest'>{i + 1}</div>
            <div className='w-full h-full pl-2'>
              <div
                style={{ width: percentages[i] + '%' }}
                className={`flex justify-end h-full relative ${
                  todaysWinningGuessIndex === i
                    ? highlightColor
                    : 'bg-custom-gray'
                }`}
              >
                <div className='text-xs font-bold pr-2 text-white'>{guess}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;

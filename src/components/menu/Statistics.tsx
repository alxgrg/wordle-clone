import { useStatistics } from '../../context/StatisticsContext';

const Statistics = () => {
  const { statistics } = useStatistics();

  return (
    <div className='flex flex-col px-4 pb-4 pt-8 justify-center items-center'>
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
    </div>
  );
};

export default Statistics;

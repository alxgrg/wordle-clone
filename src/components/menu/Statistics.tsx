import { useStatistics } from '../../context/StatisticsContext';

const Statistics = () => {
  const { statistics } = useStatistics();

  return (
    <div className='flex flex-col px-4 pb-4 pt-8 justify-center'>
      <p>{statistics.gamesPlayed}</p>
    </div>
  );
};

export default Statistics;

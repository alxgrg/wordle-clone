import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { Statistics } from '../lib/getStats';

type StatisticsContext = {
  statistics: Statistics;
  setStatistics: Dispatch<SetStateAction<Statistics>>;
};
const initialStats = {
  currentStreak: 0,
  maxStreak: 0,
  guesses: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, fail: 0 },
  winPercentage: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  averageGuesses: 0,
};
const StatisticsContext = createContext<StatisticsContext | null>(null);

export const StatisticsProvider = ({ children }: { children: ReactNode }) => {
  const [statistics, setStatistics] = useState<Statistics>(initialStats);

  return (
    <StatisticsContext.Provider value={{ statistics, setStatistics }}>
      {children}
    </StatisticsContext.Provider>
  );
};

// export { StatisticsContext, StatisticsProvider };

export const useStatistics = () => {
  const statisticsCtx = useContext(StatisticsContext);
  if (!statisticsCtx) {
    throw new Error('Statistics context does not exist');
  }
  const { statistics, setStatistics } = statisticsCtx;

  return { statistics, setStatistics };
};

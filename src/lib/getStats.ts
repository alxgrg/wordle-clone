type Guesses = {
  [key: string]: number;
};

export type Statistics = {
  currentStreak: number;
  maxStreak: number;
  guesses: Guesses;
  winPercentage: number;
  gamesPlayed: number;
  gamesWon: number;
  averageGuesses: number;
};

export const getStats = ({
  status,
  currentRowIndex,
}: {
  status: string;
  currentRowIndex: number;
}) => {
  // Check if statistics exist in local storage
  const localStatistics = localStorage.getItem('statistics');
  let tempLocalStatistics: Statistics = localStatistics
    ? JSON.parse(localStatistics)
    : {
        currentStreak: 0,
        maxStreak: 0,
        guesses: {
          '1': 0,
          '2': 0,
          '3': 0,
          '4': 0,
          '5': 0,
          '6': 0,
          fail: 0,
        },
        winPercentage: 0,
        gamesPlayed: 0,
        gamesWon: 0,
        averageGuesses: 0,
      };

  tempLocalStatistics.gamesPlayed += 1;
  // Check for win status and add to games won and current streak
  if (status === 'win') {
    tempLocalStatistics.gamesWon += 1;
    tempLocalStatistics.currentStreak += 1;

    tempLocalStatistics.guesses[currentRowIndex + 1] += 1; // add 1 to guesses it took this round
    // tempLocalStatistics.todaysWinningGuess = currentRowIndex;
  } else if (status === 'loss') {
    // Check for loss status and add 1 to failed guesses and reset current streak
    tempLocalStatistics.guesses['fail'] += 1;
    tempLocalStatistics.currentStreak = 0;
  }

  if (tempLocalStatistics.currentStreak >= tempLocalStatistics.maxStreak) {
    tempLocalStatistics.maxStreak = tempLocalStatistics.currentStreak;
  }
  tempLocalStatistics.winPercentage = Math.round(
    (tempLocalStatistics.gamesWon / tempLocalStatistics.gamesPlayed) * 100
  );

  return tempLocalStatistics;
};

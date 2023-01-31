import { Evaluations } from '../hooks/useKeyboard';

export const copyResultsToClipboard = ({
  evaluations,
  gameId
}: {
  evaluations: Evaluations;
  gameId: number
}) => {
  let result = `Wordle ${gameId} ${}/6`

  for (let i = 0; i < evaluations.length; i++) {
    const row = evaluations[i];
    if (!row[0]) {
      return result
    }
    result.concat(' ')
    row.forEach((status) => {
      if (status === 'correct') {
        result.concat('🟩')
      } else if (status === 'present') {
        result.concat('🟨')
      } else {
        result.concat('⬛')
      }
    });
  }
};

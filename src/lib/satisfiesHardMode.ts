type Props = {
  currentGuess: string;
  previousGuess: string;
  evaluations: (string | undefined)[];
};

const satisfiesHardMode = ({
  currentGuess,
  previousGuess,
  evaluations,
}: Props) => {
  if (!previousGuess) {
    return;
  }
  const currentGuessArray = currentGuess.split('');
  const previousGuessArray = previousGuess.split('');

  if (evaluations.includes('correct')) {
    for (let i = 0; i < currentGuessArray.length; i++) {
      const currentGuessLetter = currentGuessArray[i];
      const previousGuessLetter = previousGuessArray[i];
      if (
        evaluations[i] === 'correct' &&
        currentGuessLetter !== previousGuessLetter
      ) {
        const letterPosition = i + 1;
        let numberWording = '';
        switch (letterPosition) {
          case 1:
            numberWording = 'st';
            break;
          case 2:
            numberWording = 'nd';
            break;
          case 3:
            numberWording = 'rd';
            break;
          default:
            numberWording = 'th';
            break;
        }

        return {
          message:
            letterPosition +
            numberWording +
            ' letter must be ' +
            previousGuessLetter,
        };
      }
    }
  }

  // Check for present letters
  for (let i = 0; i < evaluations.length; i++) {
    const evaluation = evaluations[i];

    if (evaluation === 'present') {
      if (!currentGuessArray.includes(previousGuessArray[i])) {
        return {
          message: 'Guess must contain ' + previousGuessArray[i],
        };
      }
    }
  }

  return {
    message: '',
  };
};

export default satisfiesHardMode;

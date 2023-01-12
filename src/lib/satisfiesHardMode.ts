type Props = {
  currentGuess: string;
  previousGuesses: string[];
  evaluations: (string | undefined)[][];
};

const satisfiesHardMode = ({
  currentGuess,
  previousGuesses,
  evaluations,
}: Props) => {
  // go through previous guesses and find first occurance of a correct letter
  for (let i = 0; i < previousGuesses.length; i++) {
    const prevGuess = previousGuesses[i];
    const prevGuessArr = previousGuesses[i].split('');

    if (evaluations[i].includes('correct')) {
      for (let j = 0; j < prevGuessArr.length; j++) {
        const letter = prevGuessArr[j];
        const evaluation = evaluations[i][j];

        if (evaluation === 'correct') {
          // check if guess has letter in correct position
          if (currentGuess.split('')[j] !== letter) {
            const letterPosition = j + 1;
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
            console.log(
              letterPosition,
              numberWording,
              ' letter must be ',
              letter
            );

            return {
              message:
                letterPosition + numberWording + ' letter must be ' + letter,
            };
          }
        }
      }
    }
  }
  return {
    message: '',
  };
};

export default satisfiesHardMode;

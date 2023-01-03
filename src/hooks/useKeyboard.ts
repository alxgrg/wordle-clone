import { useEffect, useState } from 'react';

export const useKeyboard = (answer: string) => {
  const [currentGuess, setCurrentGuess] = useState('');
  const [board, setBoard] = useState(['', '', '', '', '', '']);

  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [evaluations, setEvaluations] = useState<(string | undefined)[][]>(
    [...Array(6)].map((e) => Array(5))
  );

  const evaluateGuess = (guess: string) => {
    let guessArr = guess.split('');
    let answerArr = answer.split('');
    let filteredAnswer = answer.split('');

    for (let i = 0; i < guessArr.length; i++) {
      const guessLetter = guessArr[i];
      const answerLetter = answerArr[i];
      let updatedEvaluations = evaluations;

      // if letter is correct
      if (guessLetter === answerLetter) {
        updatedEvaluations[currentRowIndex][i] = 'correct';
        filteredAnswer.splice(i, 1);
      } else if (
        filteredAnswer.findIndex((letter) => letter === guessLetter) !== -1
      ) {
        console.log(
          'isPresent: ',
          guessLetter,
          filteredAnswer,
          filteredAnswer.findIndex((letter) => letter === guessLetter)
        );

        const removeIndex = filteredAnswer.findIndex(
          (letter) => letter === guessLetter
        );
        filteredAnswer.splice(removeIndex, 1);
        updatedEvaluations[currentRowIndex][i] = 'present';
      } else {
        updatedEvaluations[currentRowIndex][i] = 'absent';
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key.toUpperCase();

    if (key === 'BACKSPACE') {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }
    if (key === 'ENTER') {
      let updatedBoard = board;
      updatedBoard[currentRowIndex] = currentGuess;
      evaluateGuess(currentGuess);

      setBoard(updatedBoard);
      setCurrentGuess('');
      setCurrentRowIndex((prevRow) => (prevRow += 1));
    }
    if (/^[A-Za-z]$/.test(key)) {
      setCurrentGuess((prev) => prev + key);
    }
    // setCurrentGuess((prev) => prev + key);
  };

  return { handleKeyDown, currentGuess, board, currentRowIndex, evaluations };
};

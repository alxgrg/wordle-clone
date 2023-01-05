import { useEffect, useState } from 'react';

export const useKeyboard = (answer: string) => {
  const [currentGuess, setCurrentGuess] = useState('');
  const [board, setBoard] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [gameState, setGameState] = useState('active');

  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [evaluations, setEvaluations] = useState<(string | undefined)[][]>(
    [...Array(6)].map((e) => Array(5))
  );

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [error]);

  useEffect(() => {
    if (currentRowIndex > 5) {
      setGameState('loss');
    }
  }, [currentRowIndex]);

  const evaluateGuess = (guess: string) => {
    // Check if guess is correct
    // if (guess === answer) {
    //   setGameState('win');
    //   return;
    // }
    let guessArr = guess.split('');
    let answerArr = answer.split('');
    let filteredAnswer = answer.split('');

    // Set correct letters
    for (let i = guessArr.length - 1; i >= 0; i--) {
      const guessLetter = guessArr[i];
      const answerLetter = answerArr[i];
      if (guessLetter === answerLetter) {
        let newEvaluations = evaluations;
        newEvaluations[currentRowIndex][i] = 'correct';
        setEvaluations(newEvaluations);
        // remove correctly guess letter for later comparison
        filteredAnswer.splice(i, 1);
      }
    }
    // Check if guess is correct
    if (guess === answer) {
      setGameState('win');
      return;
    }
    console.log('filteredAnswer: ', filteredAnswer);

    // Set present letters
    for (let i = 0; i < guessArr.length; i++) {
      const guessLetter = guessArr[i]; // current guess letter

      // check if letter has already been guessed correctly
      if (evaluations[currentRowIndex][i] !== 'correct') {
        // check if guess letter is in remaining letters
        if (
          filteredAnswer.filter((letter) => letter === guessLetter).length > 0
        ) {
          let newEvaluations = evaluations;
          newEvaluations[currentRowIndex][i] = 'present';
          setEvaluations(newEvaluations);
        } else {
          // else set to absent
          let newEvaluations = evaluations;
          newEvaluations[currentRowIndex][i] = 'absent';
          setEvaluations(newEvaluations);
        }
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    // Check game state
    if (gameState !== 'active') {
      return;
    }
    const key = event.key.toUpperCase();

    if (key === 'BACKSPACE' && currentGuess.length > 0) {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }
    if (key === 'ENTER') {
      if (currentGuess.length < 5) {
        setError('Not enough letters');
        return;
      }
      let updatedBoard = board;
      updatedBoard[currentRowIndex] = currentGuess;
      evaluateGuess(currentGuess);

      setBoard(updatedBoard);
      setCurrentGuess('');
      setCurrentRowIndex((prevRow) => (prevRow += 1));
    }
    if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  return {
    handleKeyDown,
    currentGuess,
    board,
    currentRowIndex,
    evaluations,
    error,
  };
};

import { useEffect, useRef, useState } from 'react';
import { wordList } from '../static/wordList';
import satisfiesHardMode from '../lib/satisfiesHardMode';
import { loadGame, saveToLocalStorage } from '../lib/localStorage';
import { getSolution } from '../lib/getSolution';
import { getStats, Statistics } from '../lib/getStats';

export type LetterStatus = {
  [letter: string]: string;
};

const winMessages = [
  'Genius',
  'Magnificent',
  'Impressive',
  'Splendid',
  'Great',
  'Phew',
];

export type Evaluations = (string | undefined)[][];

const initialStats = {
  currentStreak: 0,
  maxStreak: 0,
  guesses: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, fail: 0 },
  winPercentage: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  averageGuesses: 0,
};

export const useKeyboard = () => {
  const [currentGuess, setCurrentGuess] = useState('');
  const [board, setBoard] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [gameState, setGameState] = useState('active');
  const [isRevealing, setIsRevealing] = useState(false);
  const [message, setMessage] = useState('');
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [evaluations, setEvaluations] = useState<Evaluations>(
    [...Array(6)].map((e) => Array(5))
  );
  const [letterStatus, setLetterStatus] = useState<LetterStatus>({});
  const [statistics, setStatistics] = useState<Statistics>(initialStats);

  console.log('statistics: ', statistics);

  // Get todays solution
  const answer = getSolution();

  // Get current date timestamp for saving to local storage game state
  const currentDate = new Date().getTime();

  // Duration of word revealing animation for delays
  // const revealAnimationDuration = 1700;
  const revealAnimationDuration = 1700;

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
  }, []);

  useEffect(() => {
    // Update local storage
    if (gameState === 'active' && board[0].length > 0) {
      saveToLocalStorage('gameState', {
        board,
        evaluations,
        currentRowIndex,
        gameState,
        letterStatus,
        lastPlayedTs: currentDate,
        lastCompletedTs: null,
      });
    }
  }, [
    board,
    currentDate,
    currentRowIndex,
    evaluations,
    gameState,
    letterStatus,
  ]);

  // If player has saved game in local storage initialize game state
  useEffect(() => {
    const savedGame = loadGame();

    if (savedGame) {
      setBoard(savedGame.board);
      setCurrentRowIndex(savedGame.currentRowIndex);
      setEvaluations(savedGame.evaluations);
      setGameState(savedGame.gameState);
      setLetterStatus(savedGame.letterStatus);
    }
  }, []);

  // Check local storage for returning player
  useEffect(() => {
    const savedGame = loadGame();
    if (!savedGame) {
      saveToLocalStorage('gameState', {
        board,
        evaluations,
        currentRowIndex,
        gameState,
        letterStatus,
        lastCompletedTs: null,
        lastPlayedTs: null,
      });
      return;
    }
  }, [board, currentRowIndex, evaluations, gameState, letterStatus]);

  // Set message timeout
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (message && gameState !== 'loss') {
      timer = setTimeout(() => setMessage(''), 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [gameState, message]);

  // Set error timeout
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (error) {
      timer = setTimeout(() => setError(null), 1800);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  // Set isRevealing timer
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isRevealing) {
      timer = setTimeout(() => setIsRevealing(false), revealAnimationDuration);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isRevealing]);

  // Check for loss
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (currentRowIndex > 5) {
      timer = setTimeout(() => setMessage(answer), revealAnimationDuration);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [answer, currentRowIndex]);

  // Add letter status for keyboard colors
  const addLetter = (guessLetter: string, status: string) => {
    let tempLetterStatus = letterStatus;
    if (
      status === 'correct' &&
      letterStatus[guessLetter] &&
      letterStatus[guessLetter] !== 'correct'
    ) {
      tempLetterStatus[guessLetter] = status;
      console.log(tempLetterStatus);

      setLetterStatus(tempLetterStatus);
    } else if (!letterStatus[guessLetter]) {
      tempLetterStatus[guessLetter] = status;
      console.log(tempLetterStatus);

      setLetterStatus(tempLetterStatus);
    }
  };

  // Evaluate submitted guess
  const evaluateGuess = (guess: string) => {
    let guessArr = guess.split('');
    let answerArr = answer.split('');
    let filteredAnswer = answer.split('');

    // Set correct letters
    for (let i = guessArr.length - 1; i >= 0; i--) {
      const guessLetter = guessArr[i];
      const answerLetter = answerArr[i];
      if (guessLetter === answerLetter) {
        // set letter status for keyboard
        addLetter(guessLetter, 'correct');

        // set evaluations
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
      // Update local storage
      saveToLocalStorage('gameState', {
        board,
        evaluations,
        currentRowIndex: currentRowIndex + 1,
        gameState: 'win',
        letterStatus,
        lastPlayedTs: currentDate,
        lastCompletedTs: currentDate,
      });
      // Check if statistics exist in local storage
      const stats = getStats({ status: 'win', currentRowIndex });
      setStatistics(stats);
      localStorage.setItem('statistics', JSON.stringify(stats));

      setTimeout(
        () => setMessage(winMessages[currentRowIndex]),
        revealAnimationDuration
      );

      return;
    }

    // Set present letters
    for (let i = 0; i < guessArr.length; i++) {
      const guessLetter = guessArr[i]; // current guess letter

      // check if letter has already been guessed correctly
      if (evaluations[currentRowIndex][i] !== 'correct') {
        // check if guess letter is in remaining letters
        if (
          filteredAnswer.filter((letter) => letter === guessLetter).length > 0
        ) {
          // set letter status
          addLetter(guessLetter, 'present');
          let newEvaluations = evaluations;
          newEvaluations[currentRowIndex][i] = 'present';
          setEvaluations(newEvaluations);

          // Remove first instance of present letter from possible letters
          const removeIndex = filteredAnswer.findIndex(
            (l) => l === guessLetter
          );
          filteredAnswer.splice(removeIndex, 1);
          console.log('filteredanswer: ', filteredAnswer);
        } else {
          // else set to absent
          addLetter(guessLetter, 'absent');
          let newEvaluations = evaluations;
          newEvaluations[currentRowIndex][i] = 'absent';
          setEvaluations(newEvaluations);
        }
      }
    }

    // Check for losing condition
    if (currentRowIndex === 5 && guess !== answer) {
      setGameState('loss');
      saveToLocalStorage('gameState', {
        board,
        evaluations,
        currentRowIndex: currentRowIndex + 1,
        gameState: 'loss',
        letterStatus,
        lastPlayedTs: currentDate,
        lastCompletedTs: currentDate,
      });
      // Set statistics in state and save to local storage
      const stats = getStats({ status: 'loss', currentRowIndex });
      setStatistics(stats);
      localStorage.setItem('statistics', JSON.stringify(stats));
    }
  };

  // Handle input from virtual keyboard
  const handleLetterInput = (input: string) => {
    setError('');
    // Check game state
    if (gameState !== 'active') {
      return;
    }
    // Check game state
    if (isRevealing) {
      console.log('revealing');

      return;
    }
    const key = input.toUpperCase();

    if (key === 'BACKSPACE' && currentGuess.length > 0) {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }
    if (key === 'ENTER') {
      if (currentGuess.length !== 5) {
        setError('Not enough letters');
        return;
      }
      // Check if guess is in word list
      if (!wordList.includes(currentGuess.toLocaleLowerCase())) {
        setError('Not in word list');
        return;
      }

      // check if satisfies hard mode
      if (
        satisfiesHardMode({ evaluations, previousGuesses: board, currentGuess })
          ?.message
      ) {
        setError(
          satisfiesHardMode({
            evaluations,
            previousGuesses: board,
            currentGuess,
          })?.message!
        );
        return;
      }
      setIsRevealing(true);
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

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    handleLetterInput(key);
  };

  const gameData = {
    handleKeyDown,
    handleLetterInput,
    currentGuess,
    board,
    currentRowIndex,
    evaluations,
    error,
    message,
    gameState,
    letterStatus,
    answer,
  };

  return gameData;
};

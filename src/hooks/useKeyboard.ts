import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { wordList } from '../static/wordList';
import satisfiesHardMode from '../lib/satisfiesHardMode';
import { GameState, loadGame, saveToLocalStorage } from '../lib/localStorage';
import { getSolution } from '../lib/getSolution';
import { getStats, Statistics } from '../lib/getStats';
import { useStatistics } from '../context/StatisticsContext';
import { ModalContext, useModal } from '../context/ModalContext';

export type LetterStatus = {
  [letter: string]: string;
};

export type Evaluations = (string | undefined)[][];

const winMessages = [
  'Genius',
  'Magnificent',
  'Impressive',
  'Splendid',
  'Great',
  'Phew',
];

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
  const [error, setError] = useState('');
  const [gameState, setGameState] = useState('active');
  const [isRevealing, setIsRevealing] = useState(false);
  const [message, setMessage] = useState('');
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [evaluations, setEvaluations] = useState<Evaluations>(
    [...Array(6)].map((e) => Array(5))
  );
  const [letterStatus, setLetterStatus] = useState<LetterStatus>({});
  // const [statistics, setStatistics] = useState<Statistics>(initialStats);

  const modalCtx = useContext(ModalContext);
  const { modalState, open, close } = useModal();

  // Get statistics context
  const { statistics, setStatistics } = useStatistics();

  // Get todays solution
  const answer = getSolution();

  // Get current date timestamp for saving to local storage game state
  const currentDate = new Date().getTime();

  // Duration of word revealing animation for delays
  const revealAnimationDuration = 1700;

  // Check if initial page load
  const firstRender = useRef(true);
  console.log('first render', firstRender.current);

  // If so set it to false after loading
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
  }, []);

  // TODO fix updating localstorage every
  // useEffect(() => {
  //   const testIndex = currentRowIndex;
  //   // Update local storage
  //   if (gameState === 'active' && board[0].length > 0) {
  //     const rawGameState = localStorage.getItem('gameState');
  //     // if (rawGameState) {
  //     //   const parsedGameState = JSON.parse(rawGameState) as GameState;
  //     //   if (parsedGameState.currentRowIndex !== currentRowIndex) {
  //     //     console.log('?????', currentRowIndex);
  //     //     saveToLocalStorage('gameState', {
  //     //       board,
  //     //       evaluations,
  //     //       currentRowIndex,
  //     //       gameState,
  //     //       letterStatus,
  //     //       lastPlayedTs: currentDate,
  //     //       lastCompletedTs: null,
  //     //       hasPlayed: false,
  //     //     });
  //     //   }
  //     // }
  //     saveToLocalStorage('gameState', {
  //       board,
  //       evaluations,
  //       currentRowIndex,
  //       gameState,
  //       letterStatus,
  //       lastPlayedTs: currentDate,
  //       lastCompletedTs: null,
  //       hasPlayed: false,
  //     });
  //     console.log('?????', currentRowIndex);
  //   }
  // }, [
  //   board,
  //   currentDate,
  //   currentRowIndex,
  //   evaluations,
  //   gameState,
  //   letterStatus,
  // ]);

  // If player has saved game in local storage initialize game state
  useEffect(() => {
    const savedGame = loadGame();

    console.log('saved game: ', savedGame);

    if (savedGame) {
      setBoard(savedGame.board);
      setCurrentRowIndex(savedGame.currentRowIndex);
      setEvaluations(savedGame.evaluations);
      setGameState(savedGame.gameState);
      setLetterStatus(savedGame.letterStatus);
    }

    const rawStats = localStorage.getItem('statistics');
    const stats = rawStats ? (JSON.parse(rawStats) as Statistics) : null;
    if (stats) {
      setStatistics(stats);
      // Set statistics in context
      // statsCtx?.setStatistics(stats);
    }
  }, [setStatistics]);

  useEffect(() => {
    if (gameState === 'win') {
      const rawGameState = localStorage.getItem('gameState');
      if (rawGameState) {
        const parsedGameState = JSON.parse(rawGameState) as GameState;
        if (parsedGameState.hasPlayed) {
          const timer = setTimeout(
            () => open('statistics'),
            revealAnimationDuration - 800
          );
          return () => {
            clearTimeout(timer);
          };
        } else {
          const timer = setTimeout(
            () => open('statistics'),
            revealAnimationDuration + 2600
          );
        }
      } else {
        // show modal
        const timer = setTimeout(
          () => open('statistics'),
          revealAnimationDuration + 2600
        );
        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [gameState, open]);

  // If win, save game state to local storage
  useEffect(() => {
    if (gameState === 'win') {
      const rawGameState = localStorage.getItem('gameState');
      if (rawGameState) {
        const gameState = JSON.parse(rawGameState) as GameState;
        if (gameState.hasPlayed) {
          return;
        }
      }
      saveToLocalStorage('gameState', {
        board,
        evaluations,
        currentRowIndex,
        gameState: 'win',
        letterStatus,
        lastPlayedTs: currentDate,
        lastCompletedTs: currentDate,
        hasPlayed: true,
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
        hasPlayed: false,
      });
      return;
    }
  }, [board, currentRowIndex, evaluations, gameState, letterStatus]);

  // Set timer to clear message
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (message && gameState !== 'loss') {
      timer = setTimeout(() => setMessage(''), 2500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [gameState, message]);

  // Set timer to clear any error message
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (error) {
      timer = setTimeout(() => setError(''), 1800);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  // Set timer to clear animation isRevealing state
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isRevealing) {
      timer = setTimeout(() => setIsRevealing(false), revealAnimationDuration);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isRevealing]);

  // If game state is loss, set timer to display message after reveal animations are finished
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (currentRowIndex > 5 && board[5] !== answer) {
      timer = setTimeout(() => setMessage(answer), revealAnimationDuration);
      console.log(currentRowIndex);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [answer, board, currentGuess, currentRowIndex]);

  // Add letter status for coloring keyboard keys
  const handleLetterStatus = (guessLetter: string, status: string) => {
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
        handleLetterStatus(guessLetter, 'correct');

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
      // saveToLocalStorage('gameState', {
      //   board,
      //   evaluations,
      //   currentRowIndex: currentRowIndex + 1,
      //   gameState: 'win',
      //   letterStatus,
      //   lastPlayedTs: currentDate,
      //   lastCompletedTs: currentDate,
      //   hasPlayed: true,
      // });
      // setCurrentRowIndex((prev) => prev + 1);

      const stats = getStats({ status: 'win', currentRowIndex });
      setStatistics(stats);
      localStorage.setItem('statistics', JSON.stringify(stats));

      // Set timer to display win message
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
          handleLetterStatus(guessLetter, 'present');
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
          handleLetterStatus(guessLetter, 'absent');
          let newEvaluations = evaluations;
          newEvaluations[currentRowIndex][i] = 'absent';
          setEvaluations(newEvaluations);
        }
      }
    }

    // Check for losing condition
    if (currentRowIndex === 5 && guess !== answer) {
      setGameState('loss');
      // Save to local storage
      saveToLocalStorage('gameState', {
        board,
        evaluations,
        currentRowIndex: currentRowIndex + 1,
        gameState: 'loss',
        letterStatus,
        lastPlayedTs: currentDate,
        lastCompletedTs: currentDate,
        hasPlayed: true,
      });
      // Set statistics in state and save to local storage
      const stats = getStats({ status: 'loss', currentRowIndex });
      setStatistics(stats);
      localStorage.setItem('statistics', JSON.stringify(stats));
    }

    saveToLocalStorage('gameState', {
      board,
      evaluations,
      currentRowIndex: currentRowIndex + 1,
      gameState,
      letterStatus,
      lastPlayedTs: currentDate,
      lastCompletedTs: null,
      hasPlayed: false,
    });
  };

  // Handle input from virtual keyboard
  const handleLetterInput = (input: string) => {
    setError('');
    // Check game state
    if (gameState !== 'active') {
      return;
    }
    if (isRevealing) {
      return;
    }

    // Make sure all input is uppercase before evaluating
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

      // TODO add hard mode state and toggle
      // Check if satisfies hard mode
      if (
        satisfiesHardMode({ evaluations, previousGuesses: board, currentGuess })
          ?.message
      ) {
        setError(
          satisfiesHardMode({
            evaluations,
            previousGuesses: board,
            currentGuess,
          })?.message
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
    statistics,
    firstRender,
  };

  return gameData;
};

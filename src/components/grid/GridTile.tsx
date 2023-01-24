// import { useEffect, useState } from 'react';

// type Props = {
//   letter: string;
//   status: string | undefined;
//   delay: number;
//   isWinner: boolean;
// };

// const GridTile = ({ letter, status, delay, isWinner }: Props) => {
//   const [statusClasses, setStatusClasses] = useState(status);
//   const [winClasses, setWinClasses] = useState('');

//   useEffect(() => {
//     setStatusClasses(status);
//   }, [status]);

//   useEffect(() => {
//     let timer: ReturnType<typeof setTimeout>;
//     if (isWinner) {
//       timer = setTimeout(() => {
//         setStatusClasses('win');
//       }, 2000);
//     }

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [isWinner]);

//   // Change delay for win animation
//   let adjustedDelay = delay * 2;
//   if (statusClasses === 'win') {
//     adjustedDelay = delay;
//   }
//   let extraDelay = delay * 300;
//   let extraDelay2 = delay * 300 + 250;

//   const extraStyles = {
//     animation: `FlipIn 250ms ease-in ${extraDelay}ms forwards, FlipOut 250ms ease-in ${extraDelay2}ms forwards`,
//   };

//   return (
//     <div
//       className={`block ${
//         letter && status === undefined ? 'animate-popIn' : ''
//       }`}
//     >
//       <div
//         style={{ animationDelay: ' ' + adjustedDelay + '00ms' }}
//         className={`${statusClasses ? statusClasses : 'border-zinc-700'}`}
//       >
//         <div
//           style={statusClasses ? extraStyles : undefined}
//           className={`before:pb-[100%] before:inline-block inline-flex w-full box-border border-2 border-zinc-700 text-[2rem] align-middle justify-center leading-4 uppercase font-bold items-center  ${
//             letter ? 'border-zinc-600' : 'border-zinc-700'
//           }`}
//         >
//           {letter}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GridTile;

import { useEffect, useMemo, useRef, useState } from 'react';
import { useFirstRender } from '../../hooks/useFirstPageLoad';
import { useKeyboard } from '../../hooks/useKeyboard';

type Props = {
  letter: string;
  status: string | undefined;
  delay: number;
  isWinner: boolean;
  hasPlayed: boolean;
};
let firstRender = true;
const GridTile = ({ letter, status, delay, isWinner, hasPlayed }: Props) => {
  const [statusClasses, setStatusClasses] = useState(status);
  const [winClasses, setWinClasses] = useState('');
  const { firstRender } = useKeyboard();
  const [letterDelay, setLetterDelay] = useState(300);

  // Check if player is returning to a finished game and set flip animation delay accordingly
  useEffect(() => {
    if (firstRender) {
      setLetterDelay(125);
    }

    const timer = setTimeout(() => {
      setLetterDelay(300);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    setStatusClasses(status);
  }, [status]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isWinner) {
      let winMessageDelay = 2000;

      timer = setTimeout(() => {
        setStatusClasses('win');
      }, winMessageDelay);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isWinner]);

  // Change delay for win animation
  let adjustedDelay = delay * 2;
  if (statusClasses === 'win') {
    adjustedDelay = delay;
  }
  let extraDelay = delay * letterDelay;
  let extraDelay2 = delay * letterDelay + 250;

  const extraStyles = {
    animation: `FlipIn 250ms ease-in ${extraDelay}ms forwards, FlipOut 250ms ease-in ${extraDelay2}ms forwards`,
  };

  return (
    <div
      className={`block ${
        letter && status === undefined ? 'animate-popIn' : ''
      }`}
    >
      <div
        style={{ animationDelay: ' ' + adjustedDelay + '00ms' }}
        className={`${
          statusClasses && statusClasses === 'win' && !hasPlayed
            ? statusClasses + ' winAnimation'
            : statusClasses
            ? statusClasses
            : 'border-zinc-700'
        }`}
      >
        <div
          style={statusClasses ? extraStyles : undefined}
          className={`before:pb-[100%] before:inline-block inline-flex w-full box-border border-2 border-zinc-700 text-[2rem] align-middle justify-center leading-4 uppercase font-bold items-center  ${
            letter ? 'border-zinc-600' : 'border-zinc-700'
          }`}
        >
          {letter}
        </div>
      </div>
    </div>
  );
};

export default GridTile;

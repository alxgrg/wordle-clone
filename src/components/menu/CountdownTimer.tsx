import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0
    );
    let secondsLeft = Math.floor((midnight.getTime() - now.getTime()) / 1000);

    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const secs = secondsLeft % 60;
    setTimeRemaining(
      `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    );

    const intervalId = setInterval(() => {
      secondsLeft--;
      const hours = Math.floor(secondsLeft / 3600);
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const secs = secondsLeft % 60;
      setTimeRemaining(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      );

      if (secondsLeft === 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='flex-1'>
      <div className='flex text-4xl items-center justify-center text-center'>
        {timeRemaining}
      </div>
    </div>
  );
};

export default CountdownTimer;

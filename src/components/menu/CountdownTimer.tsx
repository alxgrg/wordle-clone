import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState('24:00:00');

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
    const timeLeft = midnight.getTime() - now.getTime();
    let secondsLeft = Math.floor(timeLeft / 1000);

    const intervalId = setInterval(() => {
      const hours = Math.floor(secondsLeft / 3600);
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const secs = secondsLeft % 60;
      setTimeRemaining(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      );
      secondsLeft--;

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

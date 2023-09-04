import React, { useEffect, useState } from 'react';

const parseSeconds = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsString = secondsLeft < 10 ? `0${secondsLeft}` : `${secondsLeft}`;
  return `${minutesString}:${secondsString}`;
};

const Timer = ({ seconds = 0, callback, className }) => {
  const [time, setTime] = useState(seconds);

  const ONE_SECOND = 1000;

  useEffect(() => {
    if (time > 0) {
      setTimeout(() => {
        setTime((prev) => prev - 1);
      }, ONE_SECOND);
      return;
    }
    if (time === 0) {
      callback();
    }
  }, [time, callback]);

  return <span className={className}>{parseSeconds(time)}</span>;
};

export default Timer;

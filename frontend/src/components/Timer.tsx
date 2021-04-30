import React, { useState, useEffect, useRef } from 'react';

const Timer = () => {
  const [timerDays, setTimerDays] = useState(0o0);
  const [timerHours, setTimerHours] = useState(0o0);
  const [timerMinutes, setTimerMinutes] = useState(0o0);
  const [timerSeconds, setTimerSeconds] = useState(0o0);

  const interval : any = useRef<number | undefined>();

  const startTimer = (countdownDate : any) => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
      clearInterval(interval.current);
    } else {
      setTimerDays(days);
      setTimerHours(hours);
      setTimerMinutes(minutes);
      setTimerSeconds(seconds);
    }
  };

  function saveInLocalStorage(time: any) {
    localStorage.setItem('timer', time);
  }

  function getTimeFromLocalStorage() {
    return localStorage.getItem('timer');
  }

  useEffect(() => {
    const localTimer = getTimeFromLocalStorage();

    if (localTimer) {
      interval.current = setInterval(() => {
        startTimer(+localTimer);
      }, 1000);
    } else {
      const countdownDate = new Date().getTime() + 60 * 24 * 60 * 1000;
      saveInLocalStorage(countdownDate);
      interval.current = setInterval(() => {
        startTimer(+countdownDate);
      }, 1000);
    }

    return () => clearInterval(interval.current);
  }, []);

  return (
    <div>
      <h1 className="clockText">
        {String(timerHours).padStart(2, '0')}:
        {String(timerMinutes).padStart(2, '0')}:
        {String(timerSeconds).padStart(2, '0')}
      </h1>
    </div>
  );
};

export default Timer;

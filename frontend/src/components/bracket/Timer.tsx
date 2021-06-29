/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, useRef, useContext } from 'react';

import { GameContext } from '../../hardhat/SymfoniContext';

const Timer = (props: any) => {
  const game = useContext(GameContext);

  const [timerDays, setTimerDays] = useState(0o0);
  const [timerHours, setTimerHours] = useState(0o0);
  const [timerMinutes, setTimerMinutes] = useState(0o0);
  const [timerSeconds, setTimerSeconds] = useState(0o0);
  const [currentRound, setCurrentRound] = useState<string>('0');
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);

  const interval: any = useRef<number | undefined>();

  const startTimer = (countdownDate: any) => {
    if (finished) {
      return;
    }
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    // * 1 === time length in hours, default is * 24, config?
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 1)) / (1000 * 60 * 60),
    );
    // to shorten to one minute change *60 to *1
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    // to shorten to ten seconds change *60 to *10
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (distance < 0) {
      localStorage.clear();
      clearInterval(interval.current);
    } else {
      setTimerDays(days);
      setTimerHours(hours);
      setTimerMinutes(minutes);
      setTimerSeconds(seconds);
      setStarted(true);
    }
  };

  function saveInLocalStorage(time: any) {
    localStorage.setItem('timer', time);
  }

  function getTimeFromLocalStorage() {
    return localStorage.getItem('timer');
  }

  useEffect(() => {
    if (finished) {
      props.newRound();
    }
    // const getRound = async()=>{
    //   // const round = await game.instance?.g_current_round()
    //   //
    //   // setCurrentRound(round?.toString() || "0")
    //   // console.log(`current rounnd ${round}`)
    // }
    // getRound();

    if (
      started &&
      timerHours === 0 &&
      timerMinutes === 0 &&
      timerSeconds === 0
    ) {
      setFinished(true);
    }

    if (props.active && !finished) {
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
    }
  }, [timerHours, timerSeconds, finished]);

  const { active } = props;
  return (
    <div>
      <h5 className={active ? 'yellowText' : 'polarisText'}>
        {String(timerHours).padStart(2, '0')}:
        {String(timerMinutes).padStart(2, '0')}:
        {String(timerSeconds).padStart(2, '0')}
      </h5>
    </div>
  );
};

export default Timer;

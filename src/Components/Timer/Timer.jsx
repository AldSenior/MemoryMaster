import { useState, useEffect } from "react";
import style from "./timer.module.css"
import { plusAtom } from "../NumbersOrdersGame/NumbersOrdersGame";
import { useAtom } from "jotai";
const Timer = ({time, setTime, isRunning, setIsRunning}) => {
  const plus = useAtom(plusAtom)
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className={style["timer"]}>
      <h1 className={style["time"]}>Время:{(time / 1000).toFixed(2)} </h1>
      {/* <div>
         <button onClick={startTimer}>Старт</button> 
        <button onClick={stopTimer}>Стоп</button>
        <button onClick={resetTimer}>Сбросить</button> 
      </div> */}
    </div>
  );
};

export default Timer;

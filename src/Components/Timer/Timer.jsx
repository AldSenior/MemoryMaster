import React, { useEffect, useMemo } from "react";
import style from "./timer.module.css";
import { useAtom } from "jotai";
import { plusAtom } from "../NumbersOrdersGame/NumbersOrdersGame";

const Timer = React.memo(({ time, setTime, isRunning, setIsRunning }) => {
  const plus = useAtom(plusAtom);

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
  }, [isRunning, setTime]);

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
  const selfTime = useMemo(()=>(time / 1000).toFixed(1),[time])

  return (
    <div className={style["timer"]}>
      <h1 className={style["time"]}>Время:{selfTime} </h1>
    </div>
  );
});

export default Timer;

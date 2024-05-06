import React, { useEffect, useMemo, useCallback } from "react";
import style from "./timer.module.css";
import { useAtom } from "jotai";
import { plusAtom } from "../../Games/NumbersOrdersGame/NumbersOrdersGame";
import {memo} from "react"

const Timer = memo(({ time, setTime, isRunning, setIsRunning }) => {
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

  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, [setIsRunning]);
  
  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, [setIsRunning]);
  
  const resetTimer = useCallback(() => {
    setTime(0);
    setIsRunning(false);
  }, [setTime, setIsRunning]);
  const selfTime = useMemo(()=>(time / 1000).toFixed(1),[time])

  return (
    <div className={style["timer"]}>
      <h1 className={style["time"]}>Время:{selfTime} </h1>
    </div>
  );
});

export default Timer;

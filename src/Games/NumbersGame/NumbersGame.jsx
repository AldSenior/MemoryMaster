import { useEffect, useState, useRef, useCallback } from "react";
import style from "./numbergame.module.css";
import { useAtom } from "jotai";
import { Cards } from "../../Cards";
import { atomStatickMassHistory } from "../../App";
const img = "../imgs/cardNumber.jpg";
const gameTitle = "Последовательность цифр";
const Answer = ({
  answerz,
  setNumberOrder,
  setSelect,
  disabled,
  difficult,
}) => {
  const [spanZIndex, setSpanZIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(localStorage.getItem("timeCurrentDateNumbersGame"));

  const time = () =>
    setTimeout(() => {
      setSpanZIndex(-1);
    }, difficult * 1000);
  useEffect(() => {
    time();
  }, []);
  const handleClick = () => {
    if (spanZIndex !== 0) {
      setSelect(answerz);
      setSpanZIndex(0);
      setNumberOrder((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const currentdate = new Date();
    const datetime = currentdate.toLocaleString("ru-ru");

    const interval = setInterval(() => {
        setCurrentDate(datetime);
        localStorage.setItem("timeCurrentDateNumbersGame", datetime);
    }, 1000);
}, [currentDate]);

  return (
    <button
      className={style["answer"]}
      onClick={handleClick}
      disabled={disabled}
    >
      <span style={{ zIndex: spanZIndex }}>{answerz}</span>
    </button>
  );
};

const NoAsnwer = () => {
  return <div className={style["kvadr"]}></div>;
};
export const NumbersGame = ({ difficult }) => {
  const [NumberOrder, setNumberOrder] = useState(0);
  const [answer, setAnswer] = useState(3);
  const [kvadr, setKvadr] = useState([]);
  const [accesAnswer, setAccesAnswer] = useState(1);
  const [noAccesAnswer, setNoAccesAnswer] = useState(0);
  const [select, setSelect] = useState(1);
  const timerRef = useRef("");
  const [timer, setTimer] = useState(difficult);
  const [record, setRecord] = useState(localStorage.getItem("recordNumbers"));
  const [StatickMassHistory, setStatickMassHistory] = useAtom(
    atomStatickMassHistory
  );
  useEffect(() => {
    if (performance.navigation.type == 1 && difficult === null) {
      window.location.href = "/SettingMemory";
    }
  }, []);
  useEffect(() => {
    const currentdate = new Date();
    const datetime = currentdate.toLocaleString("ru-ru");

    const historyCard = {
        scored: accesAnswer,
        currentDate: datetime,
        title: gameTitle,
        img,
    };

    const existingHistory = JSON.parse(localStorage.getItem("StatickMassHistory")) || [];
    
    // Keep only the latest historyCard with the highest accesAnswer
    const updatedHistory = [historyCard];
    existingHistory.forEach(item => {
        if (item.scored > historyCard.scored) {
            updatedHistory.push(item);
        }
    });

    setStatickMassHistory(updatedHistory);
    localStorage.setItem("StatickMassHistory", JSON.stringify(updatedHistory));
}, [accesAnswer, gameTitle]);
  useEffect(() => {
    if (NumberOrder === answer) {
      setAccesAnswer((prev) => prev + 1);
      setAnswer((prev) => prev + 1);
      setNumberOrder(0);
      setSelect(1);
      setTimer(difficult);
      timerRef.current.style.visibility = "visible";
      if (record < accesAnswer || record === null) {
        setRecord(accesAnswer);
        localStorage.setItem("recordNumbers", accesAnswer);
      }
    }
    if (NumberOrder === answer + 1) {
      setAnswer((prev) => prev + 1);
      setNumberOrder(0);
      setSelect(1);
      setTimer(difficult);
      timerRef.current.style.visibility = "visible";
    }
  }, [NumberOrder, answer]);
  useEffect(() => {
    if (select !== NumberOrder && NumberOrder !== 0) {
      setNoAccesAnswer((prev) => prev + 1);
      setNumberOrder(answer + 1);
    }
  }, [select]);
  const massAnswer = Array(answer)
    .fill(0)
    .map((item, index) => {
      return (
        <Answer
          disabled={select !== NumberOrder && NumberOrder !== 0 ? true : false}
          setSelect={setSelect}
          setAccesAnswer={setAccesAnswer}
          setNoAccesAnswer={setNoAccesAnswer}
          NumberOrder={NumberOrder}
          setNumberOrder={setNumberOrder}
          answerz={index + 1}
          key={Math.random()}
          difficult={difficult}
        />
      );
    });

  const massNoAnswer = Array(30 - answer)
    .fill(0)
    .map((item, index) => {
      return <NoAsnwer key={index} />;
    });
  const shuffleCards = () => {
    const suhhleMass = [...massAnswer, ...massNoAnswer];
    suhhleMass
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setKvadr(suhhleMass);
  };

  useEffect(() => {
    shuffleCards();
  }, [answer]);
  useEffect(() => {
    const timers = setTimeout(() => setTimer(timer - 1), 1000);
    if (timer == 0) {
      clearTimeout(timers);
      timerRef.current.style.visibility = "hidden";
    }
  }, [timer, answer]);
  return (
    <div className={style["game"]}>
      <p className={style["comment"]}>кликните от 1 до {answer}</p>
      <div className={style["field"]}>
        {kvadr}{" "}
        <p ref={timerRef} className={style["timer"]}>
          {timer}
        </p>
      </div>

      <p className={style["succes"]}>
        <span>
          <img className={style["galka"]} src="./imgs/galkaa.png"></img>
          {accesAnswer - 1}
        </span>
        {"  "}
        <span>
          <img className={style["krest"]} src="./imgs/krest.png" alt="" />
          {noAccesAnswer}
        </span>
      </p>
    </div>
  );
};

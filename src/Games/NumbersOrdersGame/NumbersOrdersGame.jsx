import style from "./numbersOrdersGame.module.css";
import { colors } from "../../colors";
import { useEffect, useState, useCallback } from "react";
import Timer from "../../Components/Timer/Timer";
import { atom, useAtom } from "jotai";
import { atomStatickMassHistory } from "../../App";
import { idHistoryGame } from "../../Pages/Statics/Statics";
import { Cards } from "../../Cards";
export const plusAtom = atom(false);
const orderAtom = atom(1);
const selectAtom = atom(null);
const Block = ({ i, setTime }) => {
  const [hid, setHid] = useState(false);
  const [order, setOrder] = useAtom(orderAtom);
  const [select, setSelect] = useAtom(selectAtom);
  const [plus, setPlus] = useAtom(plusAtom);
  const [currentDate, setCurrentDate] = useState(
    localStorage.getItem("timeCurrentDateNumbersOrderGame")
  );
  const handleClick = () => {
    setSelect(i);
    setOrder(order);
    setPlus(!plus);
    console.log(plus);
    if (order === i) {
      setHid(true);
      setOrder(order + 1);
    } else {
      setHid(false);
      setTime((prev) => prev + 1000);
    }
  };
  useEffect(() => {
    const currentdate = new Date();
    const datetime = currentdate.toLocaleString("ru-ru");

    const interval = setInterval(() => {
      setCurrentDate(datetime);
      localStorage.setItem("timeCurrentDateNumbersOrderGame", datetime);
    }, 1000);
  }, [currentDate]);

  return (
    <div
      style={{
        visibility: hid ? "hidden" : "visible",
        backgroundColor: colors[i],
      }}
      className={style["block"]}
      onClick={handleClick}
    >
      <p className={style["Numb"]}>{i}</p>
    </div>
  );
};

export const NumbersOrdersGame = ({ difficult, gameindex }) => {
  const [cards, setCards] = useState([]);
  const [select, setSelect] = useAtom(selectAtom);
  const [order, setOrder] = useAtom(orderAtom);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [idHisGame, setIdHisGame] = useAtom(idHistoryGame)
  const [record, setRecord] = useState(
    localStorage.getItem("recordNumberOrder")
  );
  const [StatickMassHistory, setStatickMassHistory] = useAtom(
    atomStatickMassHistory
  );
  useEffect(() => {
    const currentdate = new Date();
    const datetime = currentdate.toLocaleString("ru-ru");

    const historyCard = {
      scored: order,
      currentDate: datetime,
      title: Cards[gameindex].title,
      img:Cards[gameindex].img,
      id:idHisGame
    };
    const existingHistory =
      JSON.parse(localStorage.getItem("StatickMassHistory")) || [];
    const updatedHistory = [...existingHistory, historyCard];
    setStatickMassHistory(updatedHistory);
    localStorage.setItem("StatickMassHistory", JSON.stringify(updatedHistory));
  }, [order]);
  useEffect(() => {
    if (performance.navigation.type == 1 && difficult === null) {
      window.location.href = "/SettingMemory";
      const historyMinusBag =StatickMassHistory.pop()
      setStatickMassHistory(historyMinusBag)
    }
  }, []);
  useEffect(() => {
    if (order === difficult + 1) {
      setIsRunning(false);
      if (record <= (time / 1000).toFixed(1) || record === null) {
        setRecord((time / 1000).toFixed(1));
        localStorage.setItem("recordNumberOrder", (time / 1000).toFixed(1));
      }
    }
  }, [order]);
  const mass = Array(difficult)
    .fill(0)
    .map((item, i) => {
      return (
        <Block
          order={order}
          select={select}
          setSelect={setSelect}
          i={i + 1}
          key={i}
          setTime={setTime}
        />
      );
    });
  const shuffleCards = () => {
    const shuffledCards = [...mass];
    shuffledCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };
  if (time === 0) {
    setOrder(1);
  }
  useEffect(() => {
    shuffleCards();
  }, []);
  const size = cards.length;
  let cardSize = Math.sqrt(size) * 124;
  return (
    <div className={style["game"]}>
      <div className={style["timer"]}>
        {order < difficult + 1 ? (
          <p className={style["order"]}>Текущее число:{order}</p>
        ) : (
          <p className={style["order"]}>Победа!</p>
        )}
        {
          <Timer
            time={time}
            setTime={setTime}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
          />
        }
      </div>
      <div className={style["field"]} style={{ width: cardSize }}>
        {cards}
      </div>
    </div>
  );
};

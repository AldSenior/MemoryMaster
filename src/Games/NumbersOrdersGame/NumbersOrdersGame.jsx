import style from "./numbersOrdersGame.module.css";
import { colors } from "../../colors";
import { useEffect, useState } from "react";
import Timer from "../../Components/Timer/Timer";
import { atom, useAtom } from "jotai";
import { atomStatickMassHistory } from "../../App";
import { idHistoryGame } from "../../Pages/Statics/Statics";
import { Cards } from "../../Cards";
import { Button } from "@gravity-ui/uikit";
import { Icon } from "@gravity-ui/uikit";
import { Gear } from "@gravity-ui/icons";
import { ArrowsRotateLeft } from "@gravity-ui/icons";
import { Link } from "react-router-dom";
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
    if (order === i && !hid) {
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
  const [idHisGame, setIdHisGame] = useAtom(idHistoryGame);
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
      scored: `${(time/1000).toFixed(2)} сек`,
      currentDate: datetime,
      title: Cards[gameindex].title,
      img: Cards[gameindex].img,
      id: idHisGame,
    };
    const existingHistory =
      JSON.parse(localStorage.getItem("StatickMassHistory")) || [];
    const updatedHistory = [...existingHistory, historyCard];
    setStatickMassHistory(updatedHistory);
    localStorage.setItem("StatickMassHistory", JSON.stringify(updatedHistory));
  }, [time]);
  useEffect(() => {
    if (performance.navigation.type == 1 && difficult === null) {
      window.location.href = "/SettingMemory";
      const historyMinusBag = StatickMassHistory.pop();
      setStatickMassHistory(historyMinusBag);
    }
  }, []);
  useEffect(() => {
    if (order === difficult + 1) {
      setIsRunning(false);
      if (record <= time || record === null) {
        setRecord(time);
        localStorage.setItem("recordNumberOrder", `${time} сек`);
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
      <div className={style["buttons"]}>
        <Link to="/SettingMemory">
          <Button view="outlined" size="l" className="btn-grabity">
            <Icon data={Gear} size={18} />
            Настройки
          </Button>
        </Link>
        <Button
          className="btn-grabity"
          view="outlined"
          size="l"
          onClick={() => {
            shuffleCards();
            setTime(0);
            setOrder(1);
            setSelect(null);
            document.querySelectorAll(`.${style["block"]}`).forEach((item) => {
              item.style.visibility = "visible";
            });
          }}
        >
          <Icon data={ArrowsRotateLeft} size={18} />
          Рестарт
        </Button>
      </div>
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

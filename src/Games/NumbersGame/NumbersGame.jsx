import { useEffect, useState, useRef } from "react";
import style from "./numbergame.module.css";
import { useAtom } from "jotai";
import { idHistoryGame } from "../../Pages/Statics/Statics";
import { atomStatickMassHistory } from "../../App";
import { Cards } from "../../Cards";
import { Button } from "@gravity-ui/uikit";
import { Icon } from "@gravity-ui/uikit";
import { Gear } from "@gravity-ui/icons";
import { ArrowsRotateLeft } from "@gravity-ui/icons";
import { Link } from "react-router-dom";
const Answer = ({
  answerz,
  setNumberOrder,
  setSelect,
  disabled,
  difficult,
}) => {
  const [spanZIndex, setSpanZIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(
    localStorage.getItem("timeCurrentDateNumbersGame")
  );

  const time = () =>
    setTimeout(() => {
      setSpanZIndex(-1);
    }, difficult?.kolvo * 1000);
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
export const NumbersGame = ({ difficult, gameindex }) => {
  const [NumberOrder, setNumberOrder] = useState(0);
  const [answer, setAnswer] = useState(3);
  const [kvadr, setKvadr] = useState([]);
  const [accesAnswer, setAccesAnswer] = useState(1);
  const [noAccesAnswer, setNoAccesAnswer] = useState(0);
  const [select, setSelect] = useState(1);
  const timerRef = useRef("");
  const [timer, setTimer] = useState(difficult?.kolvo);
  const [idHisGame, setIdHisGame] = useAtom(idHistoryGame);
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
      scored: `${accesAnswer - 1} очков`,
      currentDate: datetime,
      title: Cards[gameindex].title,
      img: Cards[gameindex].img,
      id: idHisGame,
      diff: difficult?.diff,
    };
    if (difficult?.diff) {
      const existingHistory =
        JSON.parse(localStorage.getItem("StatickMassHistory")) || [];
      const updatedHistory = [...existingHistory, historyCard];

      setStatickMassHistory(updatedHistory);
      localStorage.setItem(
        "StatickMassHistory",
        JSON.stringify(updatedHistory)
      );
    }
  }, [timer]);
  useEffect(() => {
    if (NumberOrder === answer) {
      setAccesAnswer((prev) => prev + 1);
      setAnswer((prev) => prev + 1);
      setNumberOrder(0);
      setSelect(1);
      setTimer(difficult?.kolvo);
      timerRef.current.style.visibility = "visible";
      if (accesAnswer < localStorage.getItem("recordNumbers")) {
        localStorage.setItem("recordNumbers", `${accesAnswer} очков`);
        localStorage.setItem(
          "timeCurrentDateNumbersGame",
          new Date().toLocaleString("ru-ru")
        );
      }
    }
    if (NumberOrder === answer + 1) {
      setAnswer((prev) => prev + 1);
      setNumberOrder(0);
      setSelect(1);
      setTimer(difficult?.kolvo);
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
    const timers = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    if (timer == 0) {
      clearTimeout(timers);
      timerRef.current.style.visibility = "hidden";
    }
  }, [timer, answer]);
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
            setSelect(null);
            setAnswer(3);
            setAccesAnswer(1);
            setTimer(difficult?.kolvo);
            setNoAccesAnswer(0);
            timerRef.current.style.visibility = "visible";
          }}
        >
          <Icon data={ArrowsRotateLeft} size={18} />
          Рестарт
        </Button>
      </div>
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

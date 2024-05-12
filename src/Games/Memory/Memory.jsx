import { useState, useEffect, useCallback, memo } from "react";
import SingleCard from "../../Components/SingleCard/SingleCard";
import style from "./memory.module.css";
import { colors } from "../../colors";
import Timer from "../../Components/Timer/Timer";
import { Link } from "react-router-dom";
import { atomStatickMassHistory } from "../../App";
import { useAtom } from "jotai";
import { idHistoryGame } from "../../Pages/Statics/Statics";
import { Cards } from "../../Cards";
import { Button } from "@gravity-ui/uikit";
import { Icon } from "@gravity-ui/uikit";
import { Gear } from "@gravity-ui/icons";
import { ArrowsRotateLeft } from "@gravity-ui/icons";
import { Person } from "@gravity-ui/icons";
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
shuffle(colors);
export const Memory = memo(({ difficult, gameindex }) => {
  const [currentDate, setCurrentDate] = useState(
    localStorage.getItem("timeCurrentDateMemoryGame")
  );
  const [cards, setCards] = useState([]);
  const [idHisGame, setIdHisGame] = useAtom(idHistoryGame);
  const [turns, setTurns] = useState(0);
  const [ChoiceOne, setChoiceOne] = useState(null);
  const [ChoiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [answers, setAnswers] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [StatickMassHistory, setStatickMassHistory] = useAtom(
    atomStatickMassHistory
  );
  const currentdate = new Date();
  const datetime = currentdate.toLocaleString("ru-ru");
  const cardColors = Array(difficult?.kolvo)
    .fill(0)
    .map((item, index) => {
      return { src: colors[index], matched: false };
    });

  // перемешка карт
  const shuffleCards = useCallback(() => {
    const shuffledCards = [...cardColors, ...cardColors]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card }));
    setCards(shuffledCards);
    setTurns(0);
  }, [cardColors]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(datetime);
    }, 1000);
  }, [time]);
  useEffect(() => {
    const historyCard = {
      scored: `${(time / 1000).toFixed(2)} сек`,
      currentDate: currentDate,
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
  }, [time]);

  const handleChoice = useCallback(
    (card) => {
      ChoiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    },
    [ChoiceOne]
  );
  useEffect(() => {
    if (ChoiceOne && ChoiceTwo) {
      setDisabled(true);
      if (ChoiceOne.src === ChoiceTwo.src) {
        setAnswers((prev) => prev + 1);
        setCards((prev) => {
          return prev.map((card) => {
            if (card.src === ChoiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 600);
      }
    }
  }, [ChoiceOne, ChoiceTwo]);
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };
  useEffect(() => {
    if (performance.navigation.type == 1 && difficult === null) {
      window.location.href = "/SettingMemory";
    }
    shuffleCards();
  }, []);
  useEffect(() => {
    if (answers === difficult?.kolvo) {
      setIsRunning(false);
      if (
        (time / 1000).toFixed(2) < localStorage.getItem("recordMemory") ||
        localStorage.getItem("recordMemory") === null
      ) {
        localStorage.setItem("recordMemory", `${(time / 1000).toFixed(2)} сек`);
        localStorage.setItem("timeCurrentDateMemoryGame", currentDate);
      }
    }
  }, [answers]);
  const size = cards.length;
  let cardSize = Math.sqrt(size) * 100;

  return (
    <>
      <div className={style["buttons"]}>
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
              setChoiceTwo(null);
              setChoiceOne(null);
              shuffleCards();
              setAnswers(0);
              setTime(0);
            }}
          >
            <Icon data={ArrowsRotateLeft} size={18} />
            Рестарт
          </Button>
        </div>

        <div className={style["turns"]}>
          <p>Шагов:{turns} </p>
          <div className={style["timer"]}>
            <Timer
              time={time}
              setTime={setTime}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
            />
          </div>
        </div>
      </div>
      <div className={style["Game"]}>
        <div className={style["field"]} style={{ width: `${cardSize}px` }}>
          {cards.map((card, index) => (
            <SingleCard
              key={index}
              card={card}
              color={card.color}
              src={card.src}
              handleChoice={handleChoice}
              flipped={card === ChoiceOne || card === ChoiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
          {answers === difficult?.kolvo && (
            <div className={style["win"]}>
              <p>Победа!</p>
              <Link to="/Statics">
                <Button view="outlined" size="l">
                  <Icon data={Person} size={18} />В личный кабинет
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default Memory;

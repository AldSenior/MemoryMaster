import React, { useState, useEffect, useCallback } from "react";
import SingleCard from "../../Components/SingleCard/SingleCard";
import style from "./memory.module.css";
import { colors } from "../../colors";
import Timer from "../../Components/Timer/Timer";
import { Link } from "react-router-dom";
import  {memo} from "react"

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
shuffle(colors);

export const Memory = memo(({ difficult }) => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [ChoiceOne, setChoiceOne] = useState(null);
  const [ChoiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [answers, setAnswers] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [record, setRecord] = useState(localStorage.getItem("recordMemory"));
  const cardColors = Array(difficult)
    .fill(0)
    .map((item, index) => {
      return { src: colors[index], matched: false };
    });

  // перемешка карт
  const shuffleCards = useCallback(() => {
    const shuffledCards = [...cardColors, ...cardColors]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
  }, [cardColors]);

  const handleChoice = useCallback((card) => {
    ChoiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }, [ChoiceOne]);

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
        setTimeout(() => resetTurn(), 1000);
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
  }, []);
  useEffect(() => {
    shuffleCards();
  }, []);
  useEffect(() => {
    if (answers === difficult) {
      setIsRunning(false);
      if (record <= (time / 1000).toFixed(1) || record === null) {
        setRecord((time / 1000).toFixed(1));
        localStorage.setItem("recordMemory", (time / 1000).toFixed(1));
      }
    }
  }, [answers]);
  const size = cards.length;
  let cardSize = Math.sqrt(size) * 110;

  return (
    <>
      <div className={style["Game"]}>
        <div className={style["buttons"]}>
          <button
            type="button"
            className={style["btn"]}
            onClick={() => {
              setChoiceTwo(null);
              setChoiceOne(null);
              shuffleCards();
              setAnswers(0);
              setTime(0);
            }}
          >
            Restart
          </button>
          <Link to="/SettingMemory">
            <button className={style["btn"]}>Настройки</button>
          </Link>
          <div className={style["turns"]}>
            <p>Шагов:{turns} </p>
            <p>
              <Timer
                time={time}
                setTime={setTime}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
              />
            </p>
          </div>
        </div>

        <div className={style["field"]} style={{ width: `${cardSize}px` }}>
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              color={card.color}
              src={card.src}
              handleChoice={handleChoice}
              flipped={card === ChoiceOne || card === ChoiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
          {answers === difficult && <div>Ты выиграл!</div>}
        </div>
      </div>
    </>
  );
})

export default Memory;

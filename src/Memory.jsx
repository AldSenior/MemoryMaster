import React, { useState, useEffect } from "react";
import SingleCard from "./Components/SingleCard/SingleCard";
import { colors } from "./colors";
import "./App.css";
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
shuffle(colors);

export const Memory = ({difficult}) => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [ChoiceOne, setChoiceOne] = useState(null);
  const [ChoiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [quanity, setQuanity] = useState(4);
  const [answers, setAnswers] = useState(0);

  const cardColors = Array(quanity)
    .fill(0)
    .map((item, index) => {
      return { src: colors[index], matched: false };
    });

  // перемешка карт
  const shuffleCards = () => {
    const shuffledCards = [...cardColors, ...cardColors]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
  };
  //выбор
  const handleChoice = (card) => {
    ChoiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

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

  console.log(cards);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);
  console.log(answers);
  return (
    <>
      <div className="Game">
        <button
          type="button"
          className="btn btn-outline-dark  "
          onClick={() => {
            shuffleCards();
            setAnswers(0);
          }}
        >
          Restart
        </button>


        <div className="field">
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
          {answers === quanity && <div>Ты выиграл!</div>}
        </div>
      </div>
    </>
  );
};

export default Memory;

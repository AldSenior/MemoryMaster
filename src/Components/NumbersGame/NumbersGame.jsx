import { useEffect, useState, } from "react";
import style from "./numbergame.module.css";


const Answer = ({ answerz, setNumberOrder, NumberOrder }) => {
  const [spanZIndex, setSpanZIndex] = useState(0);

  const time = () =>
    setTimeout(() => {
      setSpanZIndex(-1);
    }, 1500);
  useEffect(() => {
    time();
  }, []);

  const handleClick = () => {
    if (spanZIndex !== 0) {
      if (NumberOrder !== answerz) {
        alert("_выв");
      } else {
        setSpanZIndex(0);
        setNumberOrder((prev) => prev + 1);
      }
    }
  };
  console.log(NumberOrder);
  return (
    <div className={style["answer"]} onClick={handleClick}>
      <span style={{ zIndex: spanZIndex }}>{answerz}</span>
    </div>
  );
};

const NoAsnwer = () => {
  return <div className={style["kvadr"]}></div>;
};

export const NumbersGame = () => {
  const [NumberOrder, setNumberOrder] = useState(1);
  const [answer, setAnswer] = useState(3);
  const [kvadr, setKvadr] = useState([]);



  useEffect(() => {
    if (NumberOrder === answer) {
      setTimeout(() => {
        setAnswer((prev) => prev + 1);
        setNumberOrder(1);
      }, 1500);
    }
  }, [NumberOrder, answer]);
  console.log(NumberOrder);

  const massAnswer = Array(answer)
    .fill(0)
    .map((item, index) => {
      return (
        <Answer
          NumberOrder={NumberOrder}
          setAnswer={setAnswer}
          setNumberOrder={setNumberOrder}
          answerz={index + 1}
          key={Math.random()}
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
  const lengthMass = massAnswer.length + massNoAnswer.length;

  return (
    <div className={style["game"]}>
      <p className={style["comment"]}>кликните от 1 до {answer}</p>
      <div className={style["field"]}>{kvadr}</div>
      <p className={style["round"]}>1/{lengthMass}</p>
      <p className={style["succes"]}>
        <span>0</span>
        <span>0</span>{" "}
      </p>
    </div>
  );
};

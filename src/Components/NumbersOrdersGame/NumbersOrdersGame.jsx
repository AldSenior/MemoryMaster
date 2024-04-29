import style from "./numbersOrdersGame.module.css";
import { colors } from "../../colors";
import { useEffect, useState } from "react";
import  Timer  from "../Timer/Timer";
import { atom , useAtom } from "jotai";
const orderAtom = atom(1)
const selectAtom = atom(null)
const Block = ({ i, setTime }) => {
  const [hid, setHid] = useState(false);
  const [order,setOrder] = useAtom(orderAtom)
  const [select,setSelect] = useAtom(selectAtom)
  const handleClick = () => {
    setSelect(i)
    setOrder(order)
    if (order === i) {
      setHid(true) 
      setOrder(order+1)
    } else {
      setHid(false);
      setTime(prev=>prev+1000)
    }
    console.log(order,select);
  };
  
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

export const NumbersOrdersGame = () => {
  const [cards, setCards] = useState([]);
  const [select, setSelect] = useAtom(selectAtom);
  const [order, setOrder] = useAtom(orderAtom);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(()=>{
    if (order === 26) {
      setIsRunning(false)
    }
  },[order])

  const mass = Array(25)
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
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className={style["game"]}>
      {/* <button>Пауза</button> */}
      <p>Текущее число:{order}</p>
      <div className="timer">{<Timer time={time} setTime={setTime} isRunning={isRunning} setIsRunning={setIsRunning} />}</div>
      <div className={style["field"]}>{cards}</div>
    </div>
  );
};

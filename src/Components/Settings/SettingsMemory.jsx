import { Link } from "react-router-dom";
import style from "./settings.module.css";
import { useState } from "react";
import Cards from "../../Cards.json"



function Selectdiff({ level, selected, setQuanity, vis, DIFF_NAMES }) {
  const handleClick = () => {
    setQuanity(DIFF_NAMES[level].kolvo);
    console.log(DIFF_NAMES[level].kolvo);
  };

  const isSelected = selected === DIFF_NAMES[level].kolvo;

  return (
    <li
      style={{ visibility: vis ? "visible" : "hidden" }}
      key={Math.random()}
      className={`${style["difficult"]} ${
        isSelected ? style[`underline`] : ""
      } `}
      onClick={handleClick}
    >
      {DIFF_NAMES[level].diff}
    </li>
  );
}

export const SettingMemory = ({ setQuanity, quanity }) => {
    const [visibleRules,setVisibleRules] = useState(false)
    const [vis, setVis] = useState(false);
    const DIFF_NAMES = Cards[0].DIFF_NAMES
  return (
    <ol className={style["settings"]}>
      <div className={style["Rules"]} style={{visibility: visibleRules ? "visible" : "hidden" }}>
        <button className={style["btnrules"]} onClick={()=>{
            setVisibleRules(prev=>!prev)
        }}>Закрыть</button>
        <h1>Правила игры "Найди пару"</h1>
        <p>
          1. На столе лежит набор карточек, которые располагаются лицевой
          стороной вниз.
          <br />
          2. Игрок открывает две любые карточки. Если изображения на них
          совпадают, они остаются открытыми.
          <br />
          3. Если изображения не совпадают, карточки закрываются, и игрок
          продолжает попытки.
          <br />
          4. Цель игры - открыть все пары карточек за минимальное количество
          ходов.
        </p>
      </div>
      {quanity !== null ? (
        <Link to="/MemoryGame">
          <p className="setting">Start</p>
        </Link>
      ) : (
        <p className="setting">Start</p>
      )}
      <p className={style["setting"]} onClick={() => {
        setVisibleRules(prev=>!prev)
      }}>
        Rules
      </p>
      <ul className={style["difficulty"]}>
        <p className="setting" onClick={() => [setVis((prev) => !prev)]}>
          Difficult
        </p>
        {DIFF_NAMES.map((item, i) => {
          return (
            <Selectdiff
              vis={vis}
              key={Math.random()}
              quanity={quanity}
              level={i}
              selected={quanity}
              setQuanity={setQuanity}
              DIFF_NAMES={DIFF_NAMES}
            />
          );
        })}
      </ul>
    </ol>
  );
};

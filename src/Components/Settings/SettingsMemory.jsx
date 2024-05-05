import { Link } from "react-router-dom";
import style from "./settings.module.css";
import { useState, useEffect } from "react";
import {Cards} from "../../Cards"



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

export const SettingMemory = ({ setQuanity, quanity, DIFF_NAMES, gameindex }) => {
    const [visibleRules,setVisibleRules] = useState(false)
    const [vis, setVis] = useState(false);

    useEffect(() => {
      if (performance.navigation.type == 1 && quanity == null) {
      }
    }, [quanity]);
    
  return (
    <ol className={style["settings"]}>
      <div className={style["Rules"]} style={{visibility: visibleRules ? "visible" : "hidden" }}>
        <button className={style["btnrules"]} onClick={()=>{
            setVisibleRules(prev=>!prev)
        }}>Закрыть</button>
        <h1>Правила игры "{Cards[gameindex].title}"</h1>
        <p>
          {Cards[gameindex].GameRules}
        </p>
      </div>
      {quanity !== null ? (
        <Link to={Cards[gameindex].gameLink}>
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

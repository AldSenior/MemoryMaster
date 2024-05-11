import { Link } from "react-router-dom";
import style from "./settings.module.css";
import { useState } from "react";
import { Cards } from "../../Cards";
import { Alert } from "@gravity-ui/uikit";

function Selectdiff({ level, selected, setQuanity, DIFF_NAMES, setAlertVis }) {
  const handleClick = () => {
    setQuanity(DIFF_NAMES[level]);
    setAlertVis(false)

  };

  const isSelected = selected === DIFF_NAMES[level];

  return (
    <li
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

export const SettingMemory = ({
  setQuanity,
  quanity,
  DIFF_NAMES,
  gameindex,
}) => {
  const [visibleRules, setVisibleRules] = useState(false);
  const [alertVis, setAlertVis] = useState(false);

  return (
    <ol className={style["settings"]}>
      <Alert
      className={style["alert"]}
        theme="info"
        align="center"
        title="Выберите уровень сложности"
        message=""
        style={{
          backgroundColor: "#3697f133",
          visibility: alertVis ? "visible" : "hidden",
        }}
        onClose={() => setAlertVis(false)}
      />
      <div
        className={style["Rules"]}
        style={{ visibility: visibleRules ? "visible" : "hidden" }}
      >
        <button
          className={style["btnrules"]}
          onClick={() => {
            setVisibleRules((prev) => !prev);
          }}
        >
          Закрыть
        </button>
        <h1>Правила игры "{Cards[gameindex].title}"</h1>
        <p>{Cards[gameindex].gameRules}</p>
      </div>
      {quanity !== null ? (
        <Link to={Cards[gameindex].gameLink}>
          <p className={style["setting"]}>Начать</p>
        </Link>
      ) : (
        <p
          className={style["setting"]}
          onClick={() => {
            setAlertVis(true)
          }}
        >
          Начать
        </p>
      )}
      <p
        className={style["setting"]}
        onClick={() => {
          setVisibleRules((prev) => !prev);
        }}
      >
        Правила
      </p>
      <ul className={style["difficultys"]}>
        <p className={style["setting"]}>Сложность</p>
        {DIFF_NAMES.map((item, i) => {
          return (
            <Selectdiff
              key={i}
              quanity={quanity}
              level={i}
              selected={quanity}
              setQuanity={setQuanity}
              DIFF_NAMES={DIFF_NAMES}
              setAlertVis={setAlertVis}
            />
          );
        })}
      </ul>
    </ol>
  );
};

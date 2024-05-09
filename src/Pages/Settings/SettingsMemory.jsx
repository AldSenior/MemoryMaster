import { Link } from "react-router-dom";
import style from "./settings.module.css";
import { useState } from "react";
import { Cards } from "../../Cards";

function Selectdiff({ level, selected, setQuanity, DIFF_NAMES }) {
    const handleClick = () => {
        setQuanity(DIFF_NAMES[level].kolvo);
        console.log(DIFF_NAMES[level].kolvo);
    };

    const isSelected = selected === DIFF_NAMES[level].kolvo;

    return (
        <li key={Math.random()} className={`${style["difficult"]} ${isSelected ? style[`underline`] : ""} `} onClick={handleClick}>
            {DIFF_NAMES[level].diff}
        </li>
    );
}

export const SettingMemory = ({ setQuanity, quanity, DIFF_NAMES, gameindex }) => {
    const [visibleRules, setVisibleRules] = useState(false);

    return (
        <ol className={style["settings"]}>
            <div className={style["Rules"]} style={{ visibility: visibleRules ? "visible" : "hidden" }}>
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
                        alert("Выберите уровень сложности");
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
                    return <Selectdiff key={i} quanity={quanity} level={i} selected={quanity} setQuanity={setQuanity} DIFF_NAMES={DIFF_NAMES} />;
                })}
            </ul>
        </ol>
    );
};

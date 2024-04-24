/*
import { Link } from "react-router-dom";
import style from "./settings.module.css";

const DIFF_NAMES = ["Easy", "Medium", "Hard"];

function Selectdiff({ level, selected, setQuanity  }) {
    const handleClick = () => {
        setQuanity((1 + level) *8);
    };

    const isSelected = level === selected / 8 - 1;

    return (
        <li className={`${style["difficult"]} ${isSelected ? "underline" : ""}`} onClick={handleClick}>
            {DIFF_NAMES[level]}
        </li>
    );
}

export const SettingMemory = ({ setQuanity, quanity }) => {
    return (
        <ol className={style["settings"]}>
            <Link to="/MemoryGame">
                <li>Начать</li>
            </Link>

            <ul className={style["difficulty"]}>
                Сложность
                {DIFF_NAMES.map((item, i) => {
                    return <Selectdiff level={i} selected={quanity} setQuanity={setQuanity} />;
                })}
            </ul>

            <li>Чтото ещё</li>
            <li>Пока не придумал</li>
        </ol>
    );
};
*/

import { Link } from "react-router-dom";
import style from "./settings.module.css";

const DIFF_NAMES = [
  {
    diff: "Easy",
    kolvo: 8,
  },
  {
    diff: "Medium",
    kolvo: 18,
  },
  {
    diff: "Hard",
    kolvo: 32,
  },
];

function Selectdiff({ level, selected, setQuanity }) {
    const handleClick = () => {
        setQuanity(DIFF_NAMES[level].kolvo);
    };

    const isSelected = selected === DIFF_NAMES[level].kolvo;

    return (
        <li
            className={`${style["difficult"]} ${isSelected ? style[`underline`] : ""} `}
            onClick={handleClick}
        >
            {DIFF_NAMES[level].diff}
        </li>
    );
}

export const SettingMemory = ({ setQuanity, quanity }) => {
    return (
        <ol className={style["settings"]}>
            <Link to="/MemoryGame">
                <p className="setting">Start</p>
            </Link>

            <ul className={style["difficulty"]}>
                <p className="setting">Difficult</p>
                {DIFF_NAMES.map((item, i) => {
                    return (
                        <Selectdiff level={i} selected={quanity} setQuanity={setQuanity} />
                    );
                })}
            </ul>

            <p className="setting">Чтото ещё</p>
            <p className="setting">Пока не придумал</p>
        </ol>
    );
};
import { Link } from "react-router-dom";
import style from "./settings.module.css";

const DIFF_NAMES = [
    {
        diff: "4x4",
        kolvo: 8,
    },
    {
        diff: "6x6",
        kolvo: 18,
    },
    {
        diff: "8x8",
        kolvo: 32,
    },
];

function Selectdiff({ level, selected, setQuanity, quanity }) {
    const handleClick = () => {
        setQuanity(DIFF_NAMES[level].kolvo);
    };

    const isSelected = selected === DIFF_NAMES[level].kolvo;

    return (
        <li className={`${style["difficult"]} ${isSelected ? style[`underline`] : ""} `} onClick={handleClick}>
            {DIFF_NAMES[level].diff}
        </li>
    );
}

export const SettingMemory = ({ setQuanity, quanity }) => {
    return (
        <ol className={style["settings"]}>
            {quanity !== null ? (
                <Link to="/MemoryGame">
                    <p className="setting">Start</p>
                </Link>
            ) : (
                <p className="setting">Start</p>
            )}

            <ul className={style["difficulty"]}>
                <p className="setting">Difficult</p>
                {DIFF_NAMES.map((item, i) => {
                    return <Selectdiff quanity={quanity} level={i} selected={quanity} setQuanity={setQuanity} />;
                })}
            </ul>

            <p className="setting">Чтото ещё</p>
            <p className="setting">Пока не придумал</p>
        </ol>
    );
};

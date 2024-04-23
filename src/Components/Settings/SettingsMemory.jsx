import { Link } from "react-router-dom";
import style from "./settings.module.css";

const DIFF_NAMES = ["Easy", "Medium", "Hard"];

function Selectdiff({ level, selected, setQuanity }) {
    const handleClick = () => {
        setQuanity((1 + level) * 4);
    };

    const isSelected = level === selected / 4 - 1;

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

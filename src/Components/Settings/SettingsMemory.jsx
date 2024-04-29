import { Link } from "react-router-dom";
import style from "./settings.module.css";
import { useState } from "react";

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

function Selectdiff({ level, selected, setQuanity, vis }) {
    const handleClick = () => {
        setQuanity(DIFF_NAMES[level].kolvo);
    };

    const isSelected = selected === DIFF_NAMES[level].kolvo;

    return (
        <li style={{visibility : vis ? "visible" : "hidden"}} key={Math.random()} className={`${style["difficult"]} ${isSelected ? style[`underline`] : ""} `} onClick={handleClick}>
            {DIFF_NAMES[level].diff}
        </li>
    );
}

export const SettingMemory = ({ setQuanity, quanity }) => {
    const [vis,setVis] = useState(false)
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
                <p className="setting" onClick={()=>[
                    setVis(prev=>!prev)
                ]}>Difficult</p>
                {DIFF_NAMES.map((item, i) => {
                    return <Selectdiff vis={vis} key={Math.random()} quanity={quanity} level={i} selected={quanity} setQuanity={setQuanity} />;
                })}
            </ul>
        </ol>
    );
};

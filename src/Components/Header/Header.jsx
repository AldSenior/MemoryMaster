import style from "./header.module.css";
import { Link } from "react-router-dom";

const links = [
    {
        to: "/",
        title: "MemoryMaster",
    },
    {
        to: "/Games",
        title: "Игры",
    },
    {
        to: "/Statics",
        title: "Статистика",
    },
];

export const Header = () => {
    return (
        <header className={style["Header"]}>
            <div className={style["hea"]}>
            <Link to="/">
                <img className={style["headerlogo"]} src="./imgs/logo.png" alt="" />
            </Link>

            {links.map((item, i) => {
                return (
                    <Link key={i} to={item.to}>
                        {item.img ? <img src={item.img}></img> : ""}
                        <p className="logo">{item.title}</p>
                    </Link>
                );
            })}
            </div>
        </header>
    );
};

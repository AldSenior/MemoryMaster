import style from "./header.module.css";
import { Link } from "react-router-dom";

const links = [
    {
        to: "/",
        title: "MemoryMaster",
    },
    {
        to: "/",
        title: "Welcome",
    },
    {
        to: "/",
        title: "Games",
    },
    {
        to: "/",
        title: "Пока нету",
    },
];

export const Header = () => {
    return (
        <ul className={style["Header"]}>
            <Link to="/">
                <img className={style["headerlogo"]} src="./imgs/logo.png" alt="" />
            </Link>

            {links.map((item, i) => {
                return (
                    <Link key={i} to={item.to}>
                        <li className="logo">{item.title}</li>
                    </Link>
                );
            })}
        </ul>
    );
};

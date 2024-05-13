import style from "./header.module.css";
import { Link } from "react-router-dom";
import { memo } from "react";
import { DIV_ } from "../DIV_";
const links = [
  {
    to: "/",
    title: "MemoryMaster",
  },
  {
    to: "/Statics",
    title: "Личный кабинет",
  },
  {
    to: "/Games",
    title: "Игры",
  },
];

export const Header = memo(() => {
  return (
    <header className={style["Header"]}>
      <DIV_ />
      {links.map((item, i) => {
        return (
          <Link key={i} to={item.to}>
            {/* {item.img ? <img src={item.img}></img> : ""} */}
            <p className="logo">{item.title}</p>
          </Link>
        );
      })}
    </header>
  );
});

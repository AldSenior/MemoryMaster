import style from "./header.module.css";
import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <>
      <ul className={style["Header"]}>
      <Link to="/"><img className={style["headerlogo"]} src="./imgs/logo.png" alt="" /></Link>
        <Link to="/"><li className="logo">MemoryMaster</li></Link>
        <li className="Welcome">Welcome</li>
        <li className="Games">Games</li>
        <li className="logo">Пока нету</li>
      </ul>
    </>
  );
};

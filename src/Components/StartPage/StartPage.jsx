import style from "./startpage.module.css";
import { Link } from "react-router-dom";
export const StartPage = () => {
  return (
    <div className={style["Body"]}>
      <div className={style["MenuLeft"]}>
        <div className={style["Logo"]}>
          <img className={style["logoimg"]} src="./imgs/logo.png" alt="" />
          <p className={style["Logotext"]}>MemoryMaster</p>
        </div>

        <h1 className={style["StartText"]}>Начни Играть!</h1>
        <p className={style["desc"]}>
          Исследуйте различные режимы игры, бросьте вызов своей памяти и
          отслеживайте свой прогресс.
        </p>
        <Link to="/SettingMemory">
          <button className={style["startbtn"]}>Start</button>
        </Link>
      </div>
      <div className={style["right"]}>
        <img className={style["rightimg"]} src="./Menuright.png" alt="" />
      </div>
    </div>
  );
};

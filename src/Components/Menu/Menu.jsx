import "./menu.css";
import {Link} from "react-router-dom"
export const Menu = () => {
  return (
    <div className="Body">
      <div className="MenuLeft">
        <div className="Logo">
        <img className="logoimg" src="./icon-kivi.png" alt="" />
        <p className="Logotext">MemoryMaster</p>
        </div>

        <h1 className="StartText">Начни Играть!</h1>
        <p className="desc">
          Исследуйте различные режимы игры, бросьте вызов своей памяти и
          отслеживайте свой прогресс.
        </p>
        <Link to="/SettingMemory"><button className="startbtn">Play</button></Link>
      </div>
      <div className="right">
        <img className="rightimg" src="./Menuright.png" alt="" />
      </div>
    </div>
  );
};

import style from "./header.module.css";
export const Header = () => {
  return (
    <>
      <ul className={style["Header"]}>
        <img className={style["headerlogo"]} src="./logo.png" alt="" />
        <li className="logo">MemoryMaster</li>
        <li className="Welcome">Welcome</li>
        <li className="Games">Games</li>
        <li className="logo">Пока нету</li>
      </ul>
    </>
  );
};

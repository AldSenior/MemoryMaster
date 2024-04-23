import { Link } from "react-router-dom";
export const SettingMemory = ({difficult}) => {
  return (<>
  <nav>
    <ol className="settings">
        <Link to="/MemoryGame"><li>Начать</li></Link>
        <li>Сложность</li>
        <li>Чтото ещё</li>
        <li>Пока не придумал</li>
    </ol>
  </nav>
  </>)
};

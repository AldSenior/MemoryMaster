import { Link } from "react-router-dom";
import { useRef } from "react";
export const SettingMemory = ({ difficult }) => {
  const diffRef1 = useRef("")
  const diffRef2 = useRef("")
  const diffRef3 = useRef("")
  return (
    <>
      <nav>
        <ol className="settings">
          <Link to="/MemoryGame">
            <li>Начать</li>
          </Link>
          <ul className="difficulty">
            Cложность
            <li ref={diffRef1} className="difficult" onClick={(e)=>{
              difficult(4)
              e.target.style.textDecoration="underline"
              diffRef2.current.style.textDecoration="none"
              diffRef3.current.style.textDecoration="none"
            }}>Легкая</li>
            <li ref={diffRef2}className="difficult " onClick={(e)=>{
              difficult(6)
              e.target.style.textDecoration="underline"
              diffRef3.current.style.textDecoration="none"
              diffRef1.current.style.textDecoration="none"
            }}>Нормальная</li>
            <li ref={diffRef3} className="difficult " onClick={(e)=>{
              difficult(10)
              e.target.style.textDecoration="underline"
              diffRef1.current.style.textDecoration="none"
              diffRef2.current.style.textDecoration="none"
            }}>Сложная</li>
          </ul>
          <li>Чтото ещё</li>
          <li>Пока не придумал</li>
        </ol>
      </nav>
    </>
  );
};

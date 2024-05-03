import style from "./main.module.css";
import { Card } from "../Card/Card";
import cardinfo from "../../Cards.json";
import { Link } from "react-router-dom";

export const Main = ({setGameindex}) => {
  return (
    <main className={style["MainBody"]}>
      <div className={style["cards"]}>
        {cardinfo.map((item, index) => {
          
          return (
            <Link to={cardinfo[index].link}>
              {" "}
              <Card
              setGameindex={setGameindex}
              index={index}
                title={cardinfo[index].title}
                img={cardinfo[index].img} /*desc={cardinfo[index].desc} */
              />
            </Link>
          );
        })}
      </div>
    </main>
  );
};

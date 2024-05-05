import style from "./main.module.css";
import { Card } from "../Card/Card";
import {Cards} from "../../Cards";
import { Link } from "react-router-dom";

export const Main = ({setGameindex}) => {
  return (
    <main className={style["MainBody"]}>
      <div className={style["cards"]}>
        {Cards.map((item, index) => {
          return (
            <Link key={index} to={Cards[index].link}>
              {" "}
              <Card
              key={index}
              setGameindex={setGameindex}
              index={index}
                title={Cards[index].title}
                img={Cards[index].img} /*desc={cardinfo[index].desc} */
              />
            </Link>
          );
        })}
      </div>
    </main>
  );
};

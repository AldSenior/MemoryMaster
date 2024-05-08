import style from "./home.module.css";
import { Cards } from "../../Cards";
import {Card} from "../../Components/Card/Card"
import { Link } from "react-router-dom";
import {memo} from "react"
export const Home = memo(({setGameindex}) => {
  return (
    <main className={style["MainBody"]}>
      <div className={style["cards"]}>
        {Cards.map((item, index) => {
          return (
            <Link key={index} to={item.link}>
              <Card
              key={index}
              setGameindex={setGameindex}
              index={index}
                title={item.title}
                img={item.img}
              />
            </Link>
          );
        })}
      </div>
    </main>
  );
})

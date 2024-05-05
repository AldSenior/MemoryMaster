import style from "./statics.module.css";
import moment from "moment";
import {Cards} from "../../Cards";
import { useState, useEffect } from "react";
import { Records } from "../../Records";
export const Statics = () => {
  const [timeOnSite, setTimeOnSite] = useState(
    JSON.parse(localStorage.getItem("timeOnSite"))
  );
  useEffect(() => {
    const storedTimeOnSite =
      JSON.parse(localStorage.getItem("timeOnSite")) || 0;
    setTimeOnSite(storedTimeOnSite);
  }, []);

  const storedTimeOnSite = JSON.parse(localStorage.getItem("timeOnSite"));
  const timeSite = storedTimeOnSite ? Math.floor(storedTimeOnSite) : 0;
  const formattedTimeSite = moment.utc(timeSite).format("HH:mm:ss");

  return (
    <div className={style["Statics"]}>
      <div className={style["LeftBlockStaticsWeek"]}>
        <h1>Эта неделя</h1>
        <div className={style["StaticsBar"]}></div>
        <div className={style["leftbottom"]}>
          <div className={style["staticGoal"]}>
            <div className={style["topstaticGoal"]}>
              <img src="/imgs/target.svg" />
              <p>Goal</p>
            </div>
            <div className={style["staticsMobDan"]}>1/3</div>
          </div>
          <div className={style["staticGoal"]}>
            <div className={style["topstaticGoal"]}>
              <img src="/imgs/star.svg" />
              <p>Streak</p>
            </div>
            <div className={style["staticsMobDan"]}>1 Days </div>
          </div>
        </div>
        <h2>My Perfomance</h2>
        <div className={style["MyPerfom"]}>
          <div className={style["blockperf"]}>
            <div className={style["iconblock"]}>
              <img src="/imgs/book.png" />
            </div>
            <h3>Всего времени на сайте</h3>
            <p>{formattedTimeSite}</p>
          </div>
          <div className={style["blockperf"]}>
            <div className={style["iconblock"]}>
              <img src="/imgs/timer.svg" />
            </div>
            <h3>Время сегодня</h3>
            <p>{}</p>
          </div>
          <div className={style["blockperf"]}>
            <div className={style["iconblock"]}>
              <img src="/imgs/complitedgalka.png" />
            </div>
            <h3>Всего прошёл</h3>
            <p>3 раза</p>
          </div>
        </div>
      </div>
      <div className={style["RightBlockStaticsWeek"]}>
        <h1>Активность</h1>
        <div className={style["StoredActivity"]}>
          {Cards.map((item, index) => {
            return (
              <div key={index} className={style["stored"]}>
                <img src={item.img} alt="" />
                <div className={style["recorde"]}>
                <p>{item.title}</p>
                <p>Рекорд:{Records[index].record}</p>
                <p>Последняя активность:</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

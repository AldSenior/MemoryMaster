import style from "./statics.module.css";
import moment from "moment";
import { Cards } from "../../Cards";
import { useEffect, useMemo, useState } from "react";
import { Records } from "../../Records";
import { useAtom } from "jotai";
import { hrefAtom } from "../../App";
export const Statics = () => {
  const [CheckHrefWeb, setCheckHrefWeb] = useAtom(hrefAtom)
  const [StatickMassHistory, setStatickMassHistory] = useState(JSON.parse(localStorage.getItem("StatickMassHistory")) || []);
  const formattedTimeSite = useMemo(() => {
    const storedTimeOnSite = JSON.parse(localStorage.getItem("timeOnSite"));
    const timeSite = storedTimeOnSite ? Math.floor(storedTimeOnSite) : 0;
    return moment.utc(timeSite).format("HH:mm:ss");
  }, [localStorage.getItem("timeOnSite")]);
  useEffect(()=>{
    setCheckHrefWeb(window.location.href)
  },[])
  return (
    <div className={style["Statics"]}>
      <div className={style["LeftBlockStaticsWeek"]}>
        <h1>История активности</h1>
        <div className={style["StaticsBar"]}>
        {StatickMassHistory.map((item, index) => {
            return (
              <div key={index} className={style["stored"]}>
                <img src={item.img} alt="" />
                <div className={style["recorde"]}>
                  <p>{item.title}</p>
                  <p className={style["scored"]}><span>Очков:{item.scored}</span><span>Дата:{item.currentDate}</span></p>
                </div>
              </div>
            );
          })}
        </div>
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
              <img src="/imgs/star.svg" />
            </div>
            <h3>Streak</h3>
            <p>1</p>
          </div>
          <div className={style["blockperf"]}>
            <div className={style["iconblock"]}>
              <img src="/imgs/complitedgalka.png" />
            </div>
            <h3>Всего играл</h3>
            <p>{StatickMassHistory.length}</p>
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
                  <p>Последняя активность:{item.currentDate}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

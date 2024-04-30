import style from "./statics.module.css";
export const Statics = () => {
  return (
    <div className={style["Statics"]}>
      <div className={style["LeftBlockStaticsWeek"]}>
        <h1>This Week</h1>
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
            <div className={style["staticsMobDan"]}>103 Days </div>
          </div>
        </div>
        <p>My Perfomance</p>
        <div className={style["MyPerfom"]}>
            
          <div className={style["blockperf"]}></div>
          <div className={style["blockperf"]}></div>
          <div className={style["blockperf"]}></div>
        </div>
      </div>
    </div>
  );
};

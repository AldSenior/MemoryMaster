
import style from "./singleCard.module.css"
export default function SingleCard({
  card,
  handleChoice,
  disabled,
  src,
  flipped,
}) {
  const handleClick = () => {
    handleChoice(card);
  };
  return (
    <div className={style["card"]} disabled={disabled}>
      <div className={flipped ? style["flipped"]: style[""]}>
        <div className={style["front"]} style={{ backgroundColor: src }}></div>
        <div
          className={style["back"]}
          onClick={handleClick}
        ></div>
      </div>
    </div>
  );
}

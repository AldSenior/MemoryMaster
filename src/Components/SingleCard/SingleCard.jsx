import "./SingleCard.css";
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
    <div className="card" disabled={disabled}>
      <div className={flipped ? "flipped" : ""}>
        <div className="front" style={{ backgroundColor: src }}></div>
        <div
          className="back"
          onClick={handleClick}
        ></div>
      </div>
    </div>
  );
}

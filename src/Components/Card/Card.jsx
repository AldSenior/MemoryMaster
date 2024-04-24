import style from "./card.module.css"
export const Card = ({img,title,desc}) => {

    return(
        <div className={style["card"]}>
            <img className={style["cardImg"]} src={img} />
            <p className={style["title"]}><strong>{title}</strong></p>
            <p className={style["desc"]}>{desc}</p>
    
        </div>
    )
}
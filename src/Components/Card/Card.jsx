import style from "./card.module.css"
export const Card = ({img,title,desc, index, setGameindex}) => {

    return(
        <div className={style["card"]} onClick={()=>{
            setGameindex(index)
        }}>
            <img className={style["cardImg"]} src={img} />
            <p className={style["title"]}><strong>{title}</strong></p>
            <p className={style["desc"]}>{desc}</p>
    
        </div>
    )
}
import { useEffect, useState } from "react";
import style from "./numbergame.module.css";

const Answer = ({ answerz }) => {
    return (
        <div className={style["answer"]}>
            <span>{answerz}</span>
        </div>
    );
};
const NoAsnwer = () => {
    return <div className={style["kvadr"]}></div>;
};

export const NumbersGmae = () => {
    const [answer, setAnswer] = useState(3);
    const [kvadr, setKvadr] = useState([]);
    const massAnswer = Array(answer)
        .fill(0)
        .map((item, index) => {
            return <Answer answerz={index + 1} />;
        });
    const massNoAnswer = Array(25 - answer)
        .fill(0)
        .map((item, index) => {
            return <NoAsnwer />;
        });
    const shuffleCards = () => {
        const suhhleMass = [...massAnswer, ...massNoAnswer];
        suhhleMass.sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));
        setKvadr(suhhleMass);
    };

    useEffect(() => {
        shuffleCards();
    }, []);

    return (
        <div className={style["game"]}>
            <p className={style["comment"]}>кликните от 1 до N</p>
            <div className={style["field"]}>{kvadr}</div>
            <p className={style["round"]}>1/30</p>
            <p className={style["succes"]}>
                <span>0</span>
                <span>0</span>{" "}
            </p>
        </div>
    );
};

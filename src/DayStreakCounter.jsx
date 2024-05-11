import React, { useEffect } from "react";

export const DayStreakCounter = () => {
  const [streak, setStreak] = React.useState(0);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const updateDayCounter = () => {
    const today = getCurrentDate();
    const lastVisit = localStorage.getItem("lastVisit");

    if (!lastVisit) {
      localStorage.setItem("lastVisit", today);
      setStreak(1);
    } else if (lastVisit === today) {
      return;
    } else {
      const prevStreak = parseInt(localStorage.getItem("streak"), 10);
      if (today === getNextDate(lastVisit)) {
        localStorage.setItem("streak", String(prevStreak + 1));
        setStreak(prevStreak + 1);
      } else {
        localStorage.setItem("streak", "1");
        setStreak(1);
      }
      localStorage.setItem("lastVisit", today);
    }
  };

  const getNextDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    updateDayCounter();
  }, []);

  return (
    <>
      <h3>Текущая серия дней</h3>
      <p>{streak}</p>
    </>
  );
}



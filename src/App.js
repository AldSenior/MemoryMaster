import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import "../src/App.css";
import Memory from "./Games/Memory/Memory";
import { StartPage } from "./Pages/StartPage/StartPage";
import { Header } from "./Components/Header/Header";
import { SettingMemory } from "./Pages/Settings/SettingsMemory";
import { Routes, Route } from "react-router-dom";
import { NumbersGame } from "./Games/NumbersGame/NumbersGame";
import { NumbersOrdersGame } from "./Games/NumbersOrdersGame/NumbersOrdersGame";
import { Home } from "./Pages/Home/Home";
import { Statics } from "./Pages/Statics/Statics";
import { Cards } from "./Cards";
import { atom, useAtom } from "jotai";
export const atomStatickMassHistory = atom([]);
export const App = memo(() => {
  const [quanity, setQuanity] = useState(null);
  const [gameindex, setGameindex] = useState(
    JSON.parse(localStorage.getItem("gameindex")) || 0
  );
  const DIFF_NAMES = useMemo(() => Cards[gameindex].DIFF_NAMES, [gameindex]);
  const [timeOnSite, setTimeOnSite] = useState(() => {
    const storedTime = JSON.parse(localStorage.getItem("timeOnSite")) || 0;
    return storedTime;
  });
  const updateTimeOnSite = useCallback((newTime) => {
    setTimeOnSite(newTime);
    localStorage.setItem("timeOnSite", JSON.stringify(newTime));
  }, []);

  useEffect(() => {
    const startTime = Date.now() - timeOnSite;
    const timer = setInterval(() => {
      const newTime = Date.now() - startTime;
      updateTimeOnSite(newTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeOnSite, updateTimeOnSite]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<StartPage />}></Route>
        <Route
          path="/SettingMemory"
          element={
            <SettingMemory
              setQuanity={setQuanity}
              gameindex={gameindex}
              quanity={quanity}
              DIFF_NAMES={DIFF_NAMES}
            />
          }
        ></Route>
        <Route
          path="/Games"
          element={<Home setGameindex={setGameindex} />}
        ></Route>
        <Route
          path="/MemoryGame"
          element={<Memory difficult={quanity} gameindex={gameindex} />}
        ></Route>

        <Route
          path="/Numbers"
          element={<NumbersGame difficult={quanity} gameindex={gameindex} />}
        ></Route>
        <Route
          path="/NumbersOrders"
          element={
            <NumbersOrdersGame difficult={quanity} gameindex={gameindex} />
          }
        ></Route>
        <Route path="/Statics" element={<Statics />}></Route>
      </Routes>
    </>
  );
});
export default App;

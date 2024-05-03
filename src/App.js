import React, { useState, createContext } from "react";
import "../src/App.css";
import Memory from "./Components/Memory/Memory";
import { StartPage } from "./Components/StartPage/StartPage";
import { Header } from "./Components/Header/Header";
import { SettingMemory } from "./Components/Settings/SettingsMemory";
import { Routes, Route } from "react-router-dom";
import { NumbersGame } from "./Components/NumbersGame/NumbersGame";
import { NumbersOrdersGame } from "./Components/NumbersOrdersGame/NumbersOrdersGame";
import { Main } from "./Components/Main/Main";
import { Statics } from "./Components/Statics/Statics";
import Cards from "./Cards.json";
export const App = () => {
  const [quanity, setQuanity] = useState(null);
  const [gameindex, setGameindex] = useState(0);
  const DIFF_NAMES = Cards[gameindex].DIFF_NAMES;
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
          path="/MemoryGame"
          element={<Memory difficult={quanity} />}
        ></Route>
        <Route
          path="/Games"
          element={<Main setGameindex={setGameindex} />}
        ></Route>
        <Route
          path="/Numbers"
          element={<NumbersGame difficult={quanity} />}
        ></Route>
        <Route
          path="/NumbersOrders"
          element={<NumbersOrdersGame difficult={quanity} />}
        ></Route>
        <Route path="/Statics" element={<Statics />}></Route>
      </Routes>
    </>
  );
};
export default App;

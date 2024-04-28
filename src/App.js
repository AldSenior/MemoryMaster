import React, { useState } from "react";
import "../src/App.css";
import Memory from "./Components/Memory/Memory";
import { StartPage } from "./Components/StartPage/StartPage";
import { Header } from "./Components/Header/Header";
import { SettingMemory } from "./Components/Settings/SettingsMemory";
import { Routes, Route } from "react-router-dom";
import { NumbersGame } from "./Components/NumbersGame/NumbersGame";
import { Main } from "./Components/Main/Main";
export const App = () => {
  const [quanity, setQuanity] = useState(null);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<StartPage />}></Route>
        <Route
          path="/SettingMemory"
          element={<SettingMemory setQuanity={setQuanity} quanity={quanity} />}
        ></Route>
        <Route
          path="/MemoryGame"
          element={<Memory difficult={quanity} />}
        ></Route>
        <Route path="/Games" element={<Main />}></Route>
        <Route path="/Numbers" element={<NumbersGame />}></Route>
      </Routes>
    </>
  );
};
export default App;

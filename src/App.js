import React, { useState } from "react";
import "../src/App.css";
import Memory from "./Components/Memory";
import { StartPage } from "./Components/StartPage/StartPage";
import { Header } from "./Components/Header/Header";
import { SettingMemory } from "./Components/Settings/SettingsMemory";
import { Routes, Route } from "react-router-dom";
export const App = () => {
  const [quanity, setQuanity] = useState(4);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<StartPage />}></Route>

        <Route
          path="/SettingMemory"
          element={<SettingMemory difficult={setQuanity} />}
        ></Route>
        <Route
          path="/MemoryGame"
          element={<Memory difficult={quanity} />}
        ></Route>
      </Routes>
    </>
  );
};

export default App;

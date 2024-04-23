import React, { useState, useEffect } from "react";
import { colors } from "./colors";
import "../src/App.css";
import Memory from "./Memory";
import { Menu } from "./Components/Menu/Menu";
import { Header } from "./Components/Header/Header";
import { SettingMemory } from "./Components/Settings/SettingsMemory";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export const App = () => {
  const [quanity, setQuanity] = useState(4);
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}></Route>

          <Route
            path="/SettingMemory"
            element={<SettingMemory difficult={setQuanity} />}
          ></Route>
          <Route
            path="/MemoryGame"
            element={<Memory difficult={quanity} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

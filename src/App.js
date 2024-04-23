import React, { useState, useEffect } from "react";
import { colors } from "./colors";
import "../src/App.css";
import Memory from "./Memory";
import { Menu } from "./Components/Menu/Menu";
import { SettingMemory } from "./Components/Settings/SettingsMemory";
import {BrowserRouter,Routes,Route, Link} from "react-router-dom"
export const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu/>}></Route>
        <Route path="/SettingMemory" element={<SettingMemory/>}></Route>
        <Route path="/MemoryGame" element={<Memory/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

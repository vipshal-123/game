import React from "react";
import "./App.css";
import GameController from "./components/GameController";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game1" element={<GameController />} />
    </Routes>
  </BrowserRouter>
);

export default App;

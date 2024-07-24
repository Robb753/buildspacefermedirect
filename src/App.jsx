import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MapPage from "./Pages/MapPage";
import Home from "./Pages/Home"; // Créez une page Home pour contenir les composants de la page d'accueil
import LandingPage from "./Pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

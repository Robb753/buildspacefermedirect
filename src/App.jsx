import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Components/style.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MapPage from "./Pages/MapPage";
import Home from "./Pages/Home"; // Créez une page Home pour contenir les composants de la page d'accueil
import LandingPage from "./Components/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
      <LandingPage />
    </BrowserRouter>
  );
}

export default App;

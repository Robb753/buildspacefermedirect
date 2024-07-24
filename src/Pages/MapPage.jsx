import React from "react";
import MapComponent from "../Components/MapComponent";
import Navbar from "../Components/Navbar";

const MapPage = () => {
  return (
    <div>
      <Navbar />
      <h1>Carte des fermes</h1>
      <MapComponent />
    </div>
  );
};

export default MapPage;

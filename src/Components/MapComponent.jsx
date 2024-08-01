// Components/MapComponent.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MapComponent.css"; // Importez un fichier CSS pour les styles spécifiques

const MapComponent = () => {
  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);
  const [center, setCenter] = useState({ lat: 48.5734, lng: 7.7521 });
  const markersRef = useRef([]);

  useEffect(() => {
    const apiUrl = "https://farmedirect-6317c32e65bb.herokuapp.com/api/users";
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched users:", data);
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users data.");
      });
  }, []);

  useEffect(() => {
    const initializeMap = async () => {
      if (!window.google || !window.google.maps) {
        console.error("Google Maps JavaScript API is not loaded");
        setError("Failed to load Google Maps API.");
        return;
      }

      const { Map } = await window.google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } = await window.google.maps.importLibrary(
        "marker"
      );

      if (map === null) {
        const mapInstance = new Map(document.getElementById("map"), {
          center,
          zoom: 7,
          mapId: "5f8f7e10189920ed",
        });

        mapInstance.addListener("idle", () => {
          updateVisibleUsers(mapInstance);
        });

        setMap(mapInstance);
      } else {
        // Nettoyage des anciens marqueurs
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];

        // Ajouter les nouveaux marqueurs
        users.forEach((user) => {
          const position = { lat: user.latitude, lng: user.longitude };
          const marker = new AdvancedMarkerElement({
            map,
            position,
            title: user.name,
          });

          marker.addListener("mouseover", () => {
            setSelectedUser(user);
          });

          marker.addListener("click", () => {
            window.location.href = `/farm/${user._id}`;
          });

          markersRef.current.push(marker);
        });

        updateVisibleUsers(map);
      }
    };

    if (window.google && window.google.maps) {
      initializeMap();
    } else {
      window.initMap = initializeMap;
    }

    return () => {
      if (map !== null) {
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];
      }
    };
  }, [users, map, center]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;
    const apiKey = import.meta.env.VITE_GEOPIFY_API_KEY; // Remplacez par votre clé API Geoapify

    if (query) {
      try {
        const response = await axios.get(
          "https://api.geoapify.com/v1/geocode/search",
          {
            params: {
              text: query,
              apiKey: apiKey,
            },
          }
        );

        const { features } = response.data;

        if (features.length > 0) {
          const { lat, lon } = features[0].properties;
          setCenter({ lat, lng: lon });
        }
      } catch (err) {
        console.error("Error during search:", err);
        setError("Failed to perform search.");
      }
    }
  };

  const updateVisibleUsers = (mapInstance) => {
    const bounds = mapInstance.getBounds();
    const visible = users.filter((user) => {
      const position = { lat: user.latitude, lng: user.longitude };
      return bounds.contains(position);
    });
    setVisibleUsers(visible);
  };

  return (
    <div className="map-container">
      <div className="list-container">
        <h2>Liste des Fermes</h2>
        <ul>
          {visibleUsers.map((user) => (
            <li key={user._id}>
              <Link to={`/farm/${user._id}`}>{user.name}</Link> - {user.produce}
            </li>
          ))}
        </ul>
      </div>
      <div className="map-wrapper">
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div id="map" style={{ height: "500px", width: "100%" }}></div>
      </div>
    </div>
  );
};

export default MapComponent;

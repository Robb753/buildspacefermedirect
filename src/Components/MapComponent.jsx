import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import "../main.css"

const MapComponent = () => {
  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [map, setMap] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);
  const [center, setCenter] = useState({ lat: 48.5734, lng: 7.7521 });
  const markersRef = useRef([]);
  const markerClusterRef = useRef(null);

  useEffect(() => {
    const apiUrl = "https://farmedirect-6317c32e65bb.herokuapp.com/api/users";
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error! Status: ${response.status}");
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

        mapInstance.addListener("idle", updateVisibleUsers);
        mapInstance.addListener("zoom_changed", updateVisibleUsers);

        setMap(mapInstance);
      } else {
        // Nettoyage des anciens marqueurs
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];
        if (markerClusterRef.current) {
          markerClusterRef.current.clearMarkers();
        }

        // Ajouter les nouveaux marqueurs
        const newMarkers = users.map((user) => {
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
            window.location.link = "/farm/${user._id}";
          });

          markersRef.current = newMarkers;
        });
        if (map) {
          markerClusterRef.current = new MarkerClusterer({
            map,
            markers: newMarkers,
          });
        }
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
        if (markerClusterRef.current) {
          markerClusterRef.current.clearMarkers();
        }
      }
    };
  }, [users, map, center]);

  const updateVisibleUsers = () => {
    if (map) {
      const bounds = map.getBounds();
      if (bounds) {
        const visible = users.filter((user) => {
          const position = new window.google.maps.LatLng(
            user.latitude,
            user.longitude
          );
          return bounds.contains(position);
        });
        setVisibleUsers(visible);
      }
    }
  };

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

  return (
    <div className="container">
      <div className="search-form">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="query"
            placeholder="Rechercher une adresse..."
          />
          <button type="submit">Rechercher</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
      <div className="content">
        <div className="farm-list">
          {visibleUsers.map((user) => (
            <div
              className="farm-card"
              key={user._id}
              onClick={() => (window.location.link = `/farm/${user._id}`)}
              style={{ cursor: "pointer" }}
            >
              <h3>{user.name}</h3>
              <p>{user.produce}</p>
            </div>
          ))}
        </div>
        <div id="map" className="map"></div>
      </div>
    </div>
  );
};

export default MapComponent;
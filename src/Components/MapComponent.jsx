import React, { useEffect, useState, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import axios from "axios";

const MapComponent = () => {
  const [users, setUsers] = useState([]);
  const [map, setMap] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);
  const [center, setCenter] = useState({ lat: 48.5734, lng: 7.7521 });
  const markersRef = useRef([]);

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
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["marker"],
    });

    loader
      .load()
      .then(() => {
        const google = window.google;

        if (map === null) {
          const mapInstance = new google.maps.Map(
            document.getElementById("map"),
            {
              center,
              zoom: 7,
              mapId: "5f8f7e10189920ed",
            }
          );

          setMap(mapInstance);
        } else {
          // Nettoyage des anciens marqueurs
          markersRef.current.forEach((marker) => marker.setMap(null));
          markersRef.current = [];

          // Ajouter les nouveaux marqueurs
          users.forEach((user) => {
            const position = { lat: user.latitude, lng: user.longitude };
            const marker = new google.maps.marker.AdvancedMarkerElement({
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
        }
      })
      .catch((e) => {
        console.error("Error loading Google Maps API:", e);
        setError("Failed to load Google Maps API.");
      });

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

  return (
    <div>
      <form
        onSubmit={handleSearch}
        style={{ marginBottom: "10px", textAlign: "center" }}
      >
        <input
          type="text"
          name="query"
          placeholder="Rechercher une adresse..."
          style={{ width: "300px", padding: "5px" }}
        />
        <button type="submit" style={{ padding: "5px 10px" }}>
          Rechercher
        </button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div id="map" style={{ height: "500px", width: "100%" }}></div>
      <div>
        {users.map((user) => (
          <div key={user._id}>
            <h3>{user.name}</h3>
            <p>{user.produce}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapComponent;

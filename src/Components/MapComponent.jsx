import React, { useEffect, useState, useRef } from "react";
//import { Loader } from "@googlemaps/js-api-loader";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps"
import axios from "axios";

const MapComponent = () => {
  const [users, setUsers] = useState([]);
  //const [map, setMap] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);
  const [center, setCenter] = useState({ lat: 48.5734, lng: 7.7521 });
  const markersRef = useRef([]);

  useEffect(() => {
    const apiUrl = "https://farmedirect-6317c32e65bb.herokuapp.com/api/users"; // Assurez-vous que l'URL de l'API est correcte
    axios.get(apiUrl)
      .then((response) => {
        if (response.headers["content-type"]?.includes("application/json")) {
          setUsers(response.data);
          console.log("Fetched users:", response.data);
        } else {
          throw new Error("API response is not JSON");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users data.");
      });
  }, []);

  useEffect(() => {
    if (markersRef.current.length) {
              // Nettoyage des anciens marqueurs
          markersRef.current.forEach((marker) => marker.setMap(null));
          markersRef.current = [];
    }
    if (users.length && window.google && window.google.maps) {
      const google = window.google;
          // Ajouter les nouveaux marqueurs
          users.forEach((user) => {
            const position = { lat: user.latitude, lng: user.longitude };
            const marker = new google.maps.Marker({
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
      }, [users])

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

      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <div style={{ height: "500px", width: "100%" }}>
          <Map zoom={7} center={center} mapId={"5f886b1686753266"}>
            {users.map((user) => (
              <AdvancedMarker
                key={user._id}
                position={{ lat: user.latitude, lng: user.longitude }}
                title={user.name}
                onClick={() => (window.location.href = `/farm/${user._id}`)}
                onMouseOver={() => setSelectedUser(user)}
              >
                <Pin
                  background={"grey"}
                  borderColor={"green"}
                  glyphColor={"purple"}
                />
              </AdvancedMarker>
            ))}
          </Map>
        </div>
      </APIProvider>
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

import React, { useState } from "react";
import MapComponent from "./components/MapComponents.jsx";
import axios from "axios";
import { fetchRouteData, fetchTrafficData } from "./utils.jsx";
import "./App.css";

const App = () => {
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [coords, setCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);
  const [route, setRoute] = useState([]);
  const [trafficRoute, setTrafficRoute] = useState([]);
  const [travelTime, setTravelTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);

  const fetchCoordinates = async (place, setCoordsFunc) => {
    if (!place.trim()) {
      alert("Please enter a valid location!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`
      );

      if (!response.data.length) {
        alert("Location not found! Try again.");
        return;
      }

      const { lat, lon } = response.data[0];
    setCoordsFunc([parseFloat(lat), parseFloat(lon)]);
    } catch {
      alert("Failed to fetch location. Check your internet.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoute = async () => {
    if (!coords || !destCoords) {
      alert("Please enter both locations first!");
      return;
    }

    setRouteLoading(true);
    try {
      const { routeCoords, duration } = await fetchRouteData(coords, destCoords);
      setRoute(routeCoords || []);

      if (duration) {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.ceil((duration % 3600) / 60);
        setTravelTime(hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`);
      } else {
        setTravelTime("N/A");
      }
    } catch {
      alert("Failed to fetch route. Please try again.");
    } finally {
      setRouteLoading(false);
    }
  };

  const fetchTrafficRoute = async () => {
    if (!coords) {
      alert("Please enter a location first!");
      return;
    }

    try {
      const trafficCoords = await fetchTrafficData(coords);
      setTrafficRoute(trafficCoords || []);
    } catch {
      alert("Failed to fetch traffic data.");
    }
  };

  return (
    <div className="app">
      <h1 className="app-title">City Map Assistance</h1>

      <div className="input-section">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter starting location"
          disabled={loading}
        />
        <button onClick={() => fetchCoordinates(location, setCoords)} disabled={loading}>
          {loading ? "Loading..." : "Set Location"}
        </button>
      </div>

      <div className="input-section">
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination"
          disabled={loading}
        />
        <button onClick={() => fetchCoordinates(destination, setDestCoords)} disabled={loading}>
          {loading ? "Loading..." : "Set Destination"}
        </button>
      </div>

      <div className="button-group">
        <button onClick={fetchRoute} disabled={!coords || !destCoords || routeLoading}>
          {routeLoading ? "Loading..." : "Show Route"}
        </button>
        <button onClick={fetchTrafficRoute} disabled={!coords}>
          🚦 Show Traffic
        </button>
      </div>

      {travelTime && <p className="travel-time">Estimated Travel Time: {travelTime}</p>}

      {coords && (
        <MapComponent 
          coords={coords} 
          location={location} 
          route={route} 
          trafficRoute={trafficRoute} 
          destination={destCoords} 
        />
      )}
    </div>
  );
};

export default App;